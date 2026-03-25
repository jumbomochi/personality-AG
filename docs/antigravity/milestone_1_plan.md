# PsycheScale 2026: Milestone 1 Implementation Plan

## Goal Description
Establish the core backend foundation and the primary mathematical scoring logic for the PsycheScale platform. This encompasses the database schema design, reverse-scoring algorithms, and the integration of the four primary psychometric models: 16pf, Big Five, HEXACO, and MBTI.

## Proposed Changes

### [Database]
#### [NEW] `schema.sql`
- Implement a PostgreSQL-compatible schema.
- Tables: `Users`, `Assessments`, `Responses` (1-5 Likert scale tracking), and `Results` (JSON aggregation).

### [Settings & Security]
#### [NEW] `iam.ts`
- Implement IAM security stubs to securely broker connections via a BigQuery MCP for subsequent data warehousing.

### [Scoring Engine]
#### [NEW] `core.ts`
- Centralized mathematical engine.
- Establish `$x' = 6-x$` reverse-scoring logic.
- Implement standard factor aggregation for calculating trait sum totals.

#### [NEW] `16pf.ts`
- Implement STEN score conversion mapping (`$STEN = ((Raw - \mu) / \sigma) * 2 + 5.5$`).

#### [NEW] `bigFive.ts`
- Build the robust 120-item map across O.C.E.A.N. traits.

#### [NEW] `hexaco.ts`
- Implement the 60-item map with Honesty-Humility dimensions.

#### [NEW] `mbti.ts`
- Build the 4-letter type indicator scoring mapper converting continuous arrays to binary typologies.

## Verification Plan

### Automated Tests
- Build comprehensive unit test suite in Jest (`test/scoring/core.spec.ts`) validating reverse scoring, out-of-bound errors, factor aggregations, and STEN array bounds.
