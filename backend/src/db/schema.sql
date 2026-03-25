-- PsycheScale 2026 Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Assessment Sessions
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assessment_type VARCHAR(50) NOT NULL, -- e.g., '16pf', 'hexaco', 'bigfive', 'mbti'
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'in_progress'
);

-- Responses (encrypted at application level)
CREATE TABLE IF NOT EXISTS responses (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER REFERENCES assessments(id) ON DELETE CASCADE,
    item_id VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL, -- 1 to 5 scale
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Results (Aggregated Factor Scores)
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER REFERENCES assessments(id) ON DELETE CASCADE UNIQUE,
    factor_scores JSONB NOT NULL, -- Stores calculated results (e.g., {'O': 3.5, 'C': 4.2})
    raw_scores JSONB NOT NULL,
    generated_report_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_responses_assessment_id ON responses(assessment_id);
CREATE INDEX idx_results_assessment_id ON results(assessment_id);
