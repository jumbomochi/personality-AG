"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _16pf_1 = require("../../../src/scoring/models/16pf");
describe('16pf Scoring Logic', () => {
    describe('convertToSten', () => {
        it('should correctly boundary STEN scores to 1-10', () => {
            expect((0, _16pf_1.convertToSten)(15, 15, 5)).toBe(6);
            expect((0, _16pf_1.convertToSten)(30, 15, 5)).toBe(10);
            expect((0, _16pf_1.convertToSten)(0, 15, 5)).toBe(1);
        });
        it('should calculate accurate standard STEN ranges', () => {
            // (24 - 20) / 4 = 1. 1 * 2 + 5.5 = 7.5. Math.round(7.5) = 8
            expect(Math.round((0, _16pf_1.convertToSten)(24, 20, 4))).toBe(8);
            // (16 - 20) / 4 = -1. -1 * 2 + 5.5 = 3.5. Math.round(3.5) = 4
            expect(Math.round((0, _16pf_1.convertToSten)(16, 20, 4))).toBe(4);
        });
    });
    describe('score16pf', () => {
        it('should accurately calculate Warmth (A) and Reasoning (B)', () => {
            const mockResponses = {
                'A1': 4,
                'A2': 5,
                'A3': 3,
                'A4': 4,
                'A5': 2, // neg -> 4
                'A6': 1, // neg -> 5
                'A7': 3, // neg -> 3
                'B1': 2,
                'B2': 1,
                'B3': 4,
                'B4': 5, // neg -> 1
                'B5': 4, // neg -> 2
            };
            const results = (0, _16pf_1.score16pf)(mockResponses);
            const warmth = results['A'];
            const reasoning = results['B'];
            expect(warmth).toBeDefined();
            expect(reasoning).toBeDefined();
            if (warmth) {
                // Raw score: 4+5+3+4 + 4+5+3 = 28
                expect(warmth.raw).toBe(28);
                expect(warmth.sten).toBeDefined();
            }
            if (reasoning) {
                // Raw score: 2+1+4 + 1+2 = 10
                expect(reasoning.raw).toBe(10);
            }
        });
        it('should throw an error if a required response is missing for the model subset', () => {
            const incompleteResponses = {
                'A1': 4,
                // Missing the rest
            };
            expect(() => (0, _16pf_1.score16pf)(incompleteResponses)).toThrow();
        });
    });
});
