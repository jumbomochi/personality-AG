"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Security Middlewares (GDPR/HIPAA Compliance Prep)
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
}));
app.use(express_1.default.json());
// Rate Limiting to prevent DoS attacks
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // Temporarily increased for load testing
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);
// System Health Check for Cloud Run Probes
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
// Scoring API (Mock implementation tying to core/models)
app.post('/api/score', (req, res) => {
    try {
        const { model, responses } = req.body;
        // Simulate backend processing time for the mock response
        setTimeout(() => {
            res.json({
                success: true,
                model,
                data: { message: "Scored successfully (mocked)." },
                timestamp: new Date().toISOString()
            });
        }, 50); // Artificial delay to simulate processing overhead
    }
    catch (error) {
        console.error('Scoring error:', error);
        res.status(500).json({ success: false, error: 'Internal server error while scoring.' });
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`PsycheScale Backend API listening on port ${PORT}`);
});
