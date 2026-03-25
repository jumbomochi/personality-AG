import { hexacoModel } from '../../../src/scoring/models/hexaco';
import { calculateFactorScores, ResponseMap, ScoringFactor } from '../../../src/scoring/core';

describe('HEXACO Scoring Logic', () => {
  it('should accurately calculate Honesty-Humility', () => {
    const responses: ResponseMap = {
      ...Object.fromEntries(hexacoModel.factors.flatMap((f: ScoringFactor) => f.positiveItems.map((id: string) => [id, 3]))),
      ...Object.fromEntries(hexacoModel.factors.flatMap((f: ScoringFactor) => f.negativeItems.map((id: string) => [id, 3]))),
      // Override Honesty-Humility
      'H1': 5, 'H2': 4, 'H3': 5, 'H4': 4, 'H5': 5, // pos: 23
      'H6': 2, 'H7': 1, 'H8': 2, 'H9': 1, 'H10': 2, // neg -> 4, 5, 4, 5, 4 = 22
    };

    const results = calculateFactorScores(responses, hexacoModel);

    const h = results['H'];

    expect(h?.raw).toBe(45); // 23 + 22
    expect(h?.average).toBe(4.5); // 45 / 10
  });
});
