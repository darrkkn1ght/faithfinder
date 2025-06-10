const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'prayer_requests.json');

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

app.listen(PORT, () => {
    console.log(`Prayer request server running on http://localhost:${PORT}`);
});