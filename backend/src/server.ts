import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 8080;

// Security Middlewares (GDPR/HIPAA Compliance Prep)
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Rate Limiting to prevent DoS attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 mins
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

  } catch (error) {
    console.error('Scoring error:', error);
    res.status(500).json({ success: false, error: 'Internal server error while scoring.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`PsycheScale Backend API listening on port ${PORT}`);
});
