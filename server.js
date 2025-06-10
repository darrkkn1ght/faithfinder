const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'prayer_requests.json');
const COMMUNITY_FILE = path.join(__dirname, 'community_wall.json');

app.use(cors());
app.use(express.json());

// Helper to read/write JSON file
function readRequests() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch {
        return [];
    }
}
function writeRequests(requests) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
}
// Community Wall helpers
function readCommunity() {
    if (!fs.existsSync(COMMUNITY_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(COMMUNITY_FILE, 'utf8'));
    } catch {
        return [];
    }
}
function writeCommunity(posts) {
    fs.writeFileSync(COMMUNITY_FILE, JSON.stringify(posts, null, 2));
}

// Get all prayer requests
app.get('/api/prayer-requests', (req, res) => {
    const requests = readRequests();
    res.json(requests);
});

// Submit a new prayer request
app.post('/api/prayer-requests', (req, res) => {
    const { name, request, isAnonymous } = req.body;
    if (!request || typeof request !== 'string' || request.trim().length < 3) {
        return res.status(400).json({ error: 'Prayer request is too short.' });
    }
    const newRequest = {
        id: Date.now().toString(),
        name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
        request: request.trim(),
        createdAt: new Date().toISOString(),
        answered: false
    };
    const requests = readRequests();
    requests.unshift(newRequest); // newest first
    writeRequests(requests);
    res.status(201).json(newRequest);
});

// Mark as answered
app.patch('/api/prayer-requests/:id/answered', (req, res) => {
    const { id } = req.params;
    const requests = readRequests();
    const idx = requests.findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    requests[idx].answered = true;
    writeRequests(requests);
    res.json(requests[idx]);
});

// Get all community wall posts
app.get('/api/community', (req, res) => {
    const posts = readCommunity();
    res.json(posts);
});

// Submit a new community wall post
app.post('/api/community', (req, res) => {
    const { type, message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length < 3) {
        return res.status(400).json({ error: 'Message is too short.' });
    }
    const newPost = {
        id: Date.now().toString(),
        type: type || 'encouragement', // encouragement, testimony, answered
        message: message.trim(),
        createdAt: new Date().toISOString(),
        comments: [] // array of {id, message, createdAt}
    };
    const posts = readCommunity();
    posts.unshift(newPost); // newest first
    writeCommunity(posts);
    res.status(201).json(newPost);
});

// Add a comment to a community post
app.post('/api/community/:id/comments', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length < 1) {
        return res.status(400).json({ error: 'Comment is too short.' });
    }
    const posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    const comment = {
        id: Date.now().toString(),
        message: message.trim(),
        createdAt: new Date().toISOString()
    };
    posts[idx].comments = posts[idx].comments || [];
    posts[idx].comments.push(comment);
    writeCommunity(posts);
    res.status(201).json(comment);
});

app.listen(PORT, () => {
    console.log(`Prayer request server running on http://localhost:${PORT}`);
});