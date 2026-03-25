"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mbtiModel = void 0;
exports.calculateMbtiType = calculateMbtiType;
const core_1 = require("../core");
// Represents a trait-based mapping of MBTI using Likert scales
// This is often derived from Big Five traits (e.g., E/I corresponds to Extraversion)
exports.mbtiModel = {
    name: 'MBTI',
    factors: [
        {
            id: 'E_I',
            name: 'Extraversion vs Introversion',
            positiveItems: ['M1', 'M2', 'M3'], // E traits
            negativeItems: ['M4', 'M5', 'M6'], // I traits (reverse scored to E)
        },
        {
            id: 'S_N',
            name: 'Sensing vs Intuition',
            positiveItems: ['M7', 'M8', 'M9'], // S traits
            negativeItems: ['M10', 'M11', 'M12'], // N traits
        },
        {
            id: 'T_F',
            name: 'Thinking vs Feeling',
            positiveItems: ['M13', 'M14', 'M15'], // T traits
            negativeItems: ['M16', 'M17', 'M18'], // F traits
        },
        {
            id: 'J_P',
            name: 'Judging vs Perceiving',
            positiveItems: ['M19', 'M20', 'M21'], // J traits
            negativeItems: ['M22', 'M23', 'M24'], // P traits
        }
    ],
};
/**
 * Calculates the MBTI 4-letter type based on continuous scores.
 * Assuming a 1-5 scale, a score > 3 leans towards the positive trait,
 * < 3 leans towards the negative trait.
 */
function calculateMbtiType(responses) {
    const scores = (0, core_1.calculateFactorScores)(responses, exports.mbtiModel);
    let type = '';
    type += scores['E_I'].average >= 3 ? 'E' : 'I';
    type += scores['S_N'].average >= 3 ? 'S' : 'N';
    type += scores['T_F'].average >= 3 ? 'T' : 'F';
    type += scores['J_P'].average >= 3 ? 'J' : 'P';
    return type;
}
