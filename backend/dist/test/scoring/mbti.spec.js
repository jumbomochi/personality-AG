"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mbti_1 = require("../../src/scoring/models/mbti");
describe('MBTI Scoring Logic', () => {
    it('should correctly calculate an ENTJ type', () => {
        const responses = {
            // E > 3 (Positive responses high)
            'M1': 5, 'M2': 4, 'M3': 5,
            'M4': 2, 'M5': 1, 'M6': 2, // Negative items reversed (4, 5, 4) -> Avg High E
            // N < 3 (Negative responses high = N trait)
            'M7': 1, 'M8': 2, 'M9': 1, // Positive S items low
            'M10': 4, 'M11': 5, 'M12': 5, // Negative N items high (reversed 2, 1, 1) -> Avg Low S
            // T > 3 (Positive responses high = T trait)
            'M13': 4, 'M14': 5, 'M15': 4,
            'M16': 2, 'M17': 2, 'M18': 1,
            // J > 3 (Positive responses high = J trait)
            'M19': 5, 'M20': 5, 'M21': 4,
            'M22': 2, 'M23': 1, 'M24': 2,
        };
        const type = (0, mbti_1.calculateMbtiType)(responses);
        expect(type).toBe('ENTJ');
    });
    it('should correctly calculate an ISFP type', () => {
        const responses = {
            // I < 3
            'M1': 1, 'M2': 2, 'M3': 1,
            'M4': 5, 'M5': 4, 'M6': 5,
            // S > 3
            'M7': 5, 'M8': 4, 'M9': 5,
            'M10': 1, 'M11': 2, 'M12': 1,
            // F < 3
            'M13': 2, 'M14': 1, 'M15': 2,
            'M16': 4, 'M17': 5, 'M18': 4,
            // P < 3
            'M19': 1, 'M20': 2, 'M21': 1,
            'M22': 5, 'M23': 4, 'M24': 5,
        };
        const type = (0, mbti_1.calculateMbtiType)(responses);
        expect(type).toBe('ISFP');
    });
});
