"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hexaco_1 = require("../../../src/scoring/models/hexaco");
const core_1 = require("../../../src/scoring/core");
describe('HEXACO Scoring Logic', () => {
    it('should accurately calculate Honesty-Humility', () => {
        const responses = {
            ...Object.fromEntries(hexaco_1.hexacoModel.factors.flatMap((f) => f.positiveItems.map((id) => [id, 3]))),
            ...Object.fromEntries(hexaco_1.hexacoModel.factors.flatMap((f) => f.negativeItems.map((id) => [id, 3]))),
            // Override Honesty-Humility
            'H1': 5, 'H2': 4, 'H3': 5, 'H4': 4, 'H5': 5, // pos: 23
            'H6': 2, 'H7': 1, 'H8': 2, 'H9': 1, 'H10': 2, // neg -> 4, 5, 4, 5, 4 = 22
        };
        const results = (0, core_1.calculateFactorScores)(responses, hexaco_1.hexacoModel);
        const h = results['H'];
        expect(h?.raw).toBe(45); // 23 + 22
        expect(h?.average).toBe(4.5); // 45 / 10
    });
});
