import { bigFiveModel } from '../../../src/scoring/models/bigFive';
import { calculateFactorScores, ResponseMap, ScoringFactor } from '../../../src/scoring/core';

describe('Big Five Scoring Logic', () => {
  it('should accurately calculate Extraversion and Agreeableness', () => {
    // We only test a subset for brevity, mock the responses for E and A fully
    const responses: ResponseMap = {
      ...Object.fromEntries(bigFiveModel.factors.flatMap((f: ScoringFactor) => f.positiveItems.map((id: string) => [id, 3]))),
      ...Object.fromEntries(bigFiveModel.factors.flatMap((f: ScoringFactor) => f.negativeItems.map((id: string) => [id, 3]))),
      // Override E and A for specific tests
      'E1': 5, 'E2': 5, 'E3': 5, 'E4': 5,
      'E5': 1, 'E6': 1, 'E7': 1, 'E8': 1, // neg -> all 5s
      'A1': 1, 'A2': 1, 'A3': 1, 'A4': 1,
      'A5': 5, 'A6': 5, 'A7': 5, 'A8': 5, // neg -> all 1s
    };

    const results = calculateFactorScores(responses, bigFiveModel);

    const ext = results['E'];
    const agr = results['A'];

    expect(ext).toBeDefined();
    expect(agr).toBeDefined();

    if (ext) {
      expect(ext.raw).toBe(40); // 8 items * 5
    }

    if (agr) {
      expect(agr.raw).toBe(8); // 8 items * 1
    }
  });

  it('should throw error on missing response required by factor definition', () => {
    const responses: ResponseMap = {
      'E1': 5,
    };

    expect(() => calculateFactorScores(responses, bigFiveModel)).toThrow(/Missing response for item/);
  });
});
