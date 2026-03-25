# PsycheScale 2026: Milestone 3 Implementation Plan

## Goal Description
Finalize system stability through massive E2E integration testing and unit testing coverage across all scoring models. Refine the UI/UX based on testing feedback, dramatically upgrading the Results Dashboard to a premium, character-driven aesthetic (inspired by 16Personalities), and injecting stateful logic into the AI Mentor.

## Proposed Changes

### [Testing Infrastructure]
#### [NEW] Playwright Integration (`journey.spec.ts` & `mentor.spec.ts`)
- Script end-to-end integration tests mimicking a standard user landing, progressing through the entire Likert assessment, and hitting the dynamic rendering logic of the results payload.
- Test stateful AI Mentor message appending.

#### [MODIFY] Jest Backend Validation
- Exhaustively mock inputs for `bigFive.ts` (120 item subset parsing), `hexaco.ts`, and `16pf.ts` to confirm 100% calculation accuracy and STEN constraints.

### [UI/UX Overhaul]
#### [MODIFY] `ResultDashboard.tsx`
- Transition to a character-driven archetype hero section (e.g., deep indigo gradients, glassmorphic avatars).
- Render specialized Tabs for MBTI, Big Five, HEXACO, and 16pf.
- Install and configure `recharts` for the Big Five Radar Chart and O.C.E.A.N trait progress bars.

#### [MODIFY] `AiMentorChat.tsx`
- Convert the foundational stub to a stateful component allowing for simulated thread generation and testing via E2E.

#### [MODIFY] `QuestionCard.tsx`
- Apply UX code-review findings: Enlarge endpoints relative to midpoints, apply psychometric color mapping (rose/teal), and ensure keyboard focus states (`focus-visible:ring-4`) and active ring indicators.

## Verification Plan
- Execute `npm test` across the 5 core model suites.
- Execute Playwright UI Tests to ensure the complete user journey and AI mentor interactions successfully pass within millisecond tolerances.
- Validate `recharts` renders correctly alongside peer dependency resolution (`react-is`).
