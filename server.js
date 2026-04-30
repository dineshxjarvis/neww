import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import loginHandler from './api/login.js';
import registerHandler from './api/register.js';
import profileHandler from './api/profile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the main React index.html for all frontend routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

// API Routes
app.get('/api/health', async (req, res) => {
    res.json({ 
        mysql: !!process.env.SQL_HOST, 
        mongo: !!process.env.MONGO_URI, 
        redis: !!process.env.REDIS_BASE_URL 
    });
});

app.post('/api/login', (req, res) => loginHandler(req, res));
app.post('/api/register', (req, res) => registerHandler(req, res));
app.get('/api/profile', (req, res) => profileHandler(req, res));
app.post('/api/profile', (req, res) => profileHandler(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
