import { ScoringModel } from '../core';

// Represents HEXACO (60 items version)
// H: Honesty-Humility, E: Emotionality, X: eXtraversion,
// A: Agreeableness, C: Conscientiousness, O: Openness
export const hexacoModel: ScoringModel = {
  name: 'HEXACO-60',
  factors: [
    {
      id: 'H',
      name: 'Honesty-Humility',
      positiveItems: ['H1', 'H2', 'H3', 'H4', 'H5'],
      negativeItems: ['H6', 'H7', 'H8', 'H9', 'H10'],
    },
    {
      id: 'E',
      name: 'Emotionality',
      positiveItems: ['E1', 'E2', 'E3', 'E4', 'E5'],
      negativeItems: ['E6', 'E7', 'E8', 'E9', 'E10'],
    },
    {
      id: 'X',
      name: 'eXtraversion',
      positiveItems: ['X1', 'X2', 'X3', 'X4', 'X5'],
      negativeItems: ['X6', 'X7', 'X8', 'X9', 'X10'],
    },
    {
      id: 'A',
      name: 'Agreeableness',
      positiveItems: ['A1', 'A2', 'A3', 'A4', 'A5'],
      negativeItems: ['A6', 'A7', 'A8', 'A9', 'A10'],
    },
    {
      id: 'C',
      name: 'Conscientiousness',
      positiveItems: ['C1', 'C2', 'C3', 'C4', 'C5'],
      negativeItems: ['C6', 'C7', 'C8', 'C9', 'C10'],
    },
    {
      id: 'O',
      name: 'Openness to Experience',
      positiveItems: ['O1', 'O2', 'O3', 'O4', 'O5'],
      negativeItems: ['O6', 'O7', 'O8', 'O9', 'O10'],
    }
  ],
};
