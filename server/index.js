const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const OpenAI = require('openai');
const openai = (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_key_here')
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Create uploads folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const { pool, initializeDb } = require('./db');
initializeDb();

// Routes
app.get('/api/health', (req, r) => {
    r.json({ status: 'Cinemind API is live', db: 'MySQL Connected', timestamp: new Date() });
});

// Authentication with MySQL
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        let user;

        if (rows.length === 0) {
            // Auto-register for this hackathon demo
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [email.split('@')[0], email, password]
            );
            user = { id: result.insertId, name: email.split('@')[0], email, role: 'Director' };
        } else {
            user = rows[0];
            // In real app, verify password hash here
        }

        res.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            token: 'mock-jwt-token'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error: ' + err.message });
    }
});

// Script Analysis Endpoint with Persistence & AI Casting
app.post('/api/script/analyze', upload.single('script'), async (req, res) => {
    const file = req.file;
    const userId = req.body.userId || 1;

    console.log(`Analyzing script: ${file ? file.originalname : 'No file'}`);

    const analysisResult = {
        characters: [
            { name: 'Elias', traits: 'Enigmatic, Driven', importance: 'High', casting: 'Suggested: Timothée Chalamet or similar' },
            { name: 'Sarah', traits: 'Determined, Technical', importance: 'High', casting: 'Suggested: Zendaya or similar' },
            { name: 'The Guard', traits: 'Hostile', importance: 'Minor', casting: 'Open Casting' }
        ],
        locations: [
            { name: 'Subway Platform', atmosphere: 'Dark, Neon', complexity: 8 },
            { name: 'Control Room', atmosphere: 'Sterile, Blue', complexity: 5 }
        ],
        riskScore: 35,
        castingNotes: "High-contrast character profiles detected. Priority on expressive facial movements for Elias."
    };

    try {
        // Save analysis to MySQL
        await pool.query(
            'INSERT INTO script_analysis (user_id, file_name, tone, risk_score, analysis_data) VALUES (?, ?, ?, ?, ?)',
            [userId, file?.originalname || 'Mock Script', 'Neo-Noir', 35, JSON.stringify(analysisResult)]
        );

        setTimeout(() => {
            res.json({
                success: true,
                ...analysisResult,
                message: 'Analysis complete and saved to MySQL'
            });
        }, 2000);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database save error: ' + err.message });
    }
});

// AI Video Generation Endpoint
app.post('/api/video/generate', async (req, res) => {
    const { sceneId, prompt } = req.body;
    console.log(`Generating AI Preview for Scene ${sceneId}: ${prompt}`);

    // Simulation of a high-end video generation process
    // In a real app, this would trigger an asynchronous job (SVD, Kling, Runway, etc.)
    setTimeout(() => {
        res.json({
            success: true,
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-street-at-night-with-neon-lights-25164-large.mp4",
            metadata: {
                renderTime: "4.2s",
                frameRate: 24,
                resolution: "1080p (Neural Upscaled)"
            }
        });
    }, 4000);
});

// Script Analysis History
app.get('/api/script/history', async (req, res) => {
    const userId = req.query.userId || 1;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM script_analysis WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.json({ success: true, history: rows });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database fetch error: ' + err.message });
    }
});

// Creative Intent Endpoint
app.post('/api/creative/intent', async (req, res) => {
    const { snippet } = req.body;

    if (openai) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a cinematic director's assistant. Analyze the script snippet and return JSON with: mood, subtext, visualTone, lighting, and soundscape." },
                    { role: "user", content: snippet }
                ],
                response_format: { type: "json_object" }
            });
            return res.json(JSON.parse(completion.choices[0].message.content));
        } catch (err) {
            console.error('OpenAI Error:', err);
        }
    }

    // Fallback Mock
    res.json({
        mood: 'Noir',
        lighting: 'Low-key, High contrast',
        visualTone: 'Cyberpunk Aesthetic',
        soundscape: 'Rhythmic, Industrial'
    });
});

// Dashboard Stats Endpoint
app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const [analysisRows] = await pool.query('SELECT COUNT(*) as count FROM script_analysis');
        const [userRows] = await pool.query('SELECT COUNT(*) as count FROM users');

        res.json({
            success: true,
            stats: [
                { label: 'Scripts Analyzed', value: analysisRows[0].count.toString(), trend: '+12%', color: 'var(--primary)', icon: 'Brain' },
                { label: 'Active Users', value: userRows[0].count.toString(), trend: '+5%', color: 'var(--secondary)', icon: 'Users' },
                { label: 'Neural Frames', value: '1,240', trend: '+18%', color: 'var(--accent)', icon: 'Zap' },
                { label: 'Rendering Time', value: '14.2h', trend: '-8%', color: '#3b82f6', icon: 'Clock' }
            ]
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Stats error: ' + err.message });
    }
});

// Footage Search Endpoint
app.post('/api/footage/search', async (req, res) => {
    const { query } = req.body;
    console.log(`Searching footage for: ${query}`);

    // Simulate semantic search results
    const results = [
        { timestamp: '00:14:22', description: 'Elias enters the subway with a black coat', thumbnail: 'https://images.unsplash.com/photo-1514467953516-ec483e58c65f?auto=format&fit=crop&w=400&q=80' },
        { timestamp: '00:21:05', description: 'Close up of the mysterious briefcase', thumbnail: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&w=400&q=80' },
        { timestamp: '01:05:44', description: 'The train departing into the tunnel', thumbnail: 'https://images.unsplash.com/photo-1474487056269-ac41b32bb398?auto=format&fit=crop&w=400&q=80' },
        { timestamp: '00:05:12', description: 'Neon signs flickering in the rain', thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&q=80' }
    ].filter(item => item.description.toLowerCase().includes(query.toLowerCase()));

    setTimeout(() => {
        res.json({ success: true, results });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`CineMind server running on http://localhost:${PORT}`);
});
