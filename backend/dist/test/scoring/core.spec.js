"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/scoring/core");
const _16pf_1 = require("../../src/scoring/models/16pf");
describe('Core Scoring Logic', () => {
    describe('reverseScore', () => {
        it('should correctly reverse scores on a 1-5 scale', () => {
            expect((0, core_1.reverseScore)(1)).toBe(5);
            expect((0, core_1.reverseScore)(2)).toBe(4);
            expect((0, core_1.reverseScore)(3)).toBe(3);
            expect((0, core_1.reverseScore)(4)).toBe(2);
            expect((0, core_1.reverseScore)(5)).toBe(1);
        });
        it('should throw error for out of bound scores', () => {
            expect(() => (0, core_1.reverseScore)(0)).toThrow();
            expect(() => (0, core_1.reverseScore)(6)).toThrow();
        });
    });
    describe('calculateFactorScores', () => {
        const mockModel = {
            name: 'TestModel',
            factors: [
                {
                    id: 'F1',
                    name: 'Factor 1',
                    positiveItems: ['Q1', 'Q2'],
                    negativeItems: ['Q3'],
                }
            ]
        };
        it('should correctly sum raw scores and averages', () => {
            const responses = {
                'Q1': 4,
                'Q2': 5,
                'Q3': 1 // Reversed to 5
            };
            // Expected raw = 4 + 5 + 5 = 14
            // Expected average = 14 / 3 = 4.666...
            const result = (0, core_1.calculateFactorScores)(responses, mockModel);
            expect(result['F1'].raw).toBe(14);
            expect(result['F1'].average).toBeCloseTo(4.667, 3);
        });
        it('should throw error if a required response is missing', () => {
            const responses = {
                'Q1': 4,
                'Q3': 2
            };
            expect(() => (0, core_1.calculateFactorScores)(responses, mockModel)).toThrow(/Missing response/);
        });
    });
    describe('16pf STEN Conversion', () => {
        it('should correctly apply STEN conversions', () => {
            const responses = {
                'A1': 5, 'A2': 4, 'A3': 5, 'A4': 5, // sum = 19
                'A5': 2, 'A6': 1, 'A7': 2, // reversed: 4, 5, 4. total sum = 19 + 13 = 32
                'B1': 3, 'B2': 4, 'B3': 3, // sum = 10
                'B4': 4, 'B5': 5 // reversed: 2, 1. total sum = 10 + 3 = 13
            };
            const results = (0, _16pf_1.score16pf)(responses);
            // Factor A mean = 20, SD = 4. Raw = 32.
            // STEN = ((32 - 20) / 4) * 2 + 5.5 = (3) * 2 + 5.5 = 11.5 -> Capped at 10.
            expect(results['A'].raw).toBe(32);
            expect(results['A'].sten).toBe(10);
            // Factor B mean = 15, SD = 3. Raw = 13.
            // STEN = ((13 - 15) / 3) * 2 + 5.5 = (-0.666) * 2 + 5.5 = 4.166 -> 4
            expect(results['B'].raw).toBe(13);
            expect(results['B'].sten).toBe(4);
        });
    });
});
