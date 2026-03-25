import { calculateFactorScores, ResponseMap, ScoringModel, FactorScore } from '../core';

// Represents a simplified version of the 16pf for the prototype
// In reality, this would have 16 factors and 164 total items.
export const sixteenPfModel: ScoringModel = {
  name: '16pf',
  factors: [
    {
      id: 'A',
      name: 'Warmth',
      positiveItems: ['A1', 'A2', 'A3', 'A4'],
      negativeItems: ['A5', 'A6', 'A7'],
    },
    {
      id: 'B',
      name: 'Reasoning',
      positiveItems: ['B1', 'B2', 'B3'],
      negativeItems: ['B4', 'B5'],
    },
    // ... we would normally populate all 16 factors here
  ],
};

/**
 * Converts a raw score to a STEN (Standard Ten) score.
 * A STEN score has a mean of 5.5 and a standard deviation of 2.
 * Formula: STEN = ((Raw Score - Mean) / SD) * 2 + 5.5
 * Note: Real STEN conversions usually use specific norm tables.
 * This is an algorithmic approximation.
 * @param rawScore the raw score to convert
 * @param mean the population mean for this factor
 * @param sd the population standard deviation for this factor
 */
export function convertToSten(rawScore: number, mean: number, sd: number): number {
  if (sd === 0) return 5.5; // Avoid division by zero
  let sten = ((rawScore - mean) / sd) * 2 + 5.5;
  // Cap at 1 to 10 scale
  sten = Math.min(10, Math.max(1, Math.round(sten)));
  return sten;
}

export function score16pf(responses: ResponseMap): Record<string, FactorScore> {
  const baseScores = calculateFactorScores(responses, sixteenPfModel);

  // Apply hypothetical STEN conversions (normally derived from population data bases)
  // For the prototype, we use hardcoded means and standard deviations.
  const normData: Record<string, { mean: number; sd: number }> = {
    'A': { mean: 20, sd: 4 },
    'B': { mean: 15, sd: 3 },
  };

  for (const factorId in baseScores) {
    if (normData[factorId]) {
       baseScores[factorId].sten = convertToSten(
         baseScores[factorId].raw,
         normData[factorId].mean,
         normData[factorId].sd
       );
    }
  }

  return baseScores;
}
