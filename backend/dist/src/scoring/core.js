"use strict";
// Core Scoring Types and Utilities
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseScore = reverseScore;
exports.calculateFactorScores = calculateFactorScores;
/**
 * Calculates a reversed score for a 5-point Likert scale.
 * Formula: x' = 6 - x
 * @param score Original score (1-5)
 * @returns Reversed score (5-1)
 */
function reverseScore(score) {
    if (score < 1 || score > 5) {
        throw new Error('Score must be between 1 and 5');
    }
    return 6 - score;
}
/**
 * Core scoring engine function.
 * Calculates standard raw and average scores based on positive and negative items.
 */
function calculateFactorScores(responses, model) {
    const results = {};
    for (const factor of model.factors) {
        let rawSum = 0;
        let itemCount = 0;
        // Add positive items
        for (const itemId of factor.positiveItems) {
            if (responses[itemId] !== undefined) {
                rawSum += responses[itemId];
                itemCount++;
            }
            else {
                throw new Error(`Missing response for item ${itemId} in factor ${factor.id}`);
            }
        }
        // Add reversed negative items
        for (const itemId of factor.negativeItems) {
            if (responses[itemId] !== undefined) {
                rawSum += reverseScore(responses[itemId]);
                itemCount++;
            }
            else {
                throw new Error(`Missing response for negative item ${itemId} in factor ${factor.id}`);
            }
        }
        results[factor.id] = {
            raw: rawSum,
            average: itemCount > 0 ? rawSum / itemCount : 0,
        };
    }
    return results;
}
