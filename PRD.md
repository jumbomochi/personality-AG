# Product Requirements Document (PRD): PsycheScale Psychometric Platform 2026

## 1. Executive Summary and Problem Statement
**Project Title**: PsycheScale 2026
**Vision**: To democratize access to high-fidelity, scientifically validated psychological assessments through an AI-integrated, approachable user experience.
**Problem**: Existing personality tests are either expensive, academically inaccessible, or lack comprehensive multi-model integration.
**Solution**: A single platform consolidating 5OCEAN, HEXACO, 16pf, and MBTI frameworks using open-source IPIP item banks and real-time AI scoring.

## 2. Personas and Use Cases
**Primary Persona**: The Strategic Professional: A career-focused individual seeking to understand their leadership style, burnout triggers, and interpersonal strengths to navigate career changes.
**Secondary Persona**: The Academic Researcher: A psychologist utilizing the platform’s open IPIP scales to collect anonymized trait data for behavioral research.
- **User Story 1**: As a professional, I want to take a 10-minute assessment so that I can receive a personalized roadmap for my professional growth.
- **User Story 2**: As an HR manager, I want to analyze the aggregate HEXACO scores of my team so that I can identify potential leadership candidates with high honesty-humility.

## 3. Functional Requirements
- **FR1: Multi-Model Quiz Engine**: The system shall present a unified interface for the Big Five (120 items), HEXACO (60 items), and 16pf (164 items) assessments.
- **FR2: Scoring and Normalization**: The backend shall implement reverse scoring logic ($x' = 6-x$) and STEN score conversion for the 16pf factors.
- **FR3: Dynamic Reporting**: The system shall generate a 40+ page PDF report detailing "Superpowers," "Burnout Triggers," and "Career Values".
- **FR4: AI Mentor Integration**: The platform shall feature 24/7 access to five AI career mentors who utilize the user's specific trait profile to provide tailored advice.
- **FR5: Data Persistence and Privacy**: All user responses shall be encrypted and stored in an AlloyDB instance, accessible only via secure IAM credentials managed through the BigQuery MCP.

## 4. Non-Functional Requirements (NFRs)
- **Performance**: The scoring engine shall respond within 200ms under a load of 1,000 concurrent users.
- **Accuracy**: The scoring logic must perfectly match the IPIP and HEXACO-PI-R official scoring keys with 100% mathematical fidelity.
- **Scalability**: The infrastructure shall handle up to 50,000 monthly active users.
- **Compliance**: The platform must be fully GDPR and HIPAA compliant.
- **Availability**: The service shall maintain 99.9% uptime.

## 5. Success Metrics and Milestones
- **Success Metric 1**: Reach 10,000 total tests taken within 3 months of launch.
- **Success Metric 2**: Maintain a user satisfaction (NPS) score of >75 for the personalized career guides.

### Milestones
- **Milestone 1 (Week 1)**: Completion of core scoring logic and backend database schema using Antigravity agents.
- **Milestone 2 (Week 2)**: Integration of the React frontend using Gemini Whisk visual references.
- **Milestone 3 (Week 3)**: Automated end-to-end testing and browser-based verification of the full user journey.
- **Milestone 4 (Week 4)**: Deployment to Google Cloud Run and final security audit.
