"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigFiveModel = void 0;
// Represents Big Five (120 items version)
exports.bigFiveModel = {
    name: 'Big Five 120',
    factors: [
        {
            id: 'O',
            name: 'Openness',
            positiveItems: ['O1', 'O2', 'O3', 'O4'],
            negativeItems: ['O5', 'O6', 'O7', 'O8'],
        },
        {
            id: 'C',
            name: 'Conscientiousness',
            positiveItems: ['C1', 'C2', 'C3', 'C4'],
            negativeItems: ['C5', 'C6', 'C7', 'C8'],
        },
        {
            id: 'E',
            name: 'Extraversion',
            positiveItems: ['E1', 'E2', 'E3', 'E4'],
            negativeItems: ['E5', 'E6', 'E7', 'E8'],
        },
        {
            id: 'A',
            name: 'Agreeableness',
            positiveItems: ['A1', 'A2', 'A3', 'A4'],
            negativeItems: ['A5', 'A6', 'A7', 'A8'],
        },
        {
            id: 'N',
            name: 'Neuroticism',
            positiveItems: ['N1', 'N2', 'N3', 'N4'],
            negativeItems: ['N5', 'N6', 'N7', 'N8'],
        }
    ],
};
