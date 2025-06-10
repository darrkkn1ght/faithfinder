const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'prayer_requests.json');
const COMMUNITY_FILE = path.join(__dirname, 'community_wall.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = 'faithfinder_secret_key'; // Change this in production!

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
// User helpers
function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch {
        return [];
    }
}
function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
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
    // Assign a random avatar (icon name and color)
    const avatars = [
        { icon: 'fa-user', color: '#2563eb' },
        { icon: 'fa-user-astronaut', color: '#22c55e' },
        { icon: 'fa-user-ninja', color: '#f59e42' },
        { icon: 'fa-user-tie', color: '#764ba2' },
        { icon: 'fa-user-graduate', color: '#e53e3e' },
        { icon: 'fa-user-secret', color: '#b91c1c' },
        { icon: 'fa-user', color: '#1e293b' },
        { icon: 'fa-user', color: '#fbbf24' }
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const newPost = {
        id: Date.now().toString(),
        type: type || 'encouragement', // encouragement, testimony, answered
        message: message.trim(),
        createdAt: new Date().toISOString(),
        comments: [], // array of {id, message, createdAt, flagged, avatar}
        likes: 0,
        flagged: false,
        pinned: false,
        avatar: randomAvatar
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
    // Assign a random avatar to comment
    const avatars = [
        { icon: 'fa-user', color: '#2563eb' },
        { icon: 'fa-user-astronaut', color: '#22c55e' },
        { icon: 'fa-user-ninja', color: '#f59e42' },
        { icon: 'fa-user-tie', color: '#764ba2' },
        { icon: 'fa-user-graduate', color: '#e53e3e' },
        { icon: 'fa-user-secret', color: '#b91c1c' },
        { icon: 'fa-user', color: '#1e293b' },
        { icon: 'fa-user', color: '#fbbf24' }
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const comment = {
        id: Date.now().toString(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        flagged: false,
        avatar: randomAvatar
    };
    posts[idx].comments = posts[idx].comments || [];
    posts[idx].comments.push(comment);
    writeCommunity(posts);
    res.status(201).json(comment);
});

// Like a community post
app.post('/api/community/:id/like', (req, res) => {
    const { id } = req.params;
    const posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts[idx].likes = (posts[idx].likes || 0) + 1;
    writeCommunity(posts);
    res.json({ likes: posts[idx].likes });
});

// Flag a community post
app.post('/api/community/:id/flag', (req, res) => {
    const { id } = req.params;
    const posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts[idx].flagged = true;
    writeCommunity(posts);
    res.json({ flagged: true });
});

// Flag a comment on a community post
app.post('/api/community/:postId/comments/:commentId/flag', (req, res) => {
    const { postId, commentId } = req.params;
    const posts = readCommunity();
    const post = posts.find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const comment = (post.comments || []).find(c => c.id === commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.flagged = true;
    writeCommunity(posts);
    res.json({ flagged: true });
});

// Pin a community post
app.post('/api/community/:id/pin', (req, res) => {
    const { id } = req.params;
    const posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts.forEach(p => p.pinned = false); // Only one pinned at a time
    posts[idx].pinned = true;
    writeCommunity(posts);
    res.json({ pinned: true });
});

// Unpin a community post
app.post('/api/community/:id/unpin', (req, res) => {
    const { id } = req.params;
    const posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts[idx].pinned = false;
    writeCommunity(posts);
    res.json({ pinned: false });
});

// Delete a community post
app.delete('/api/community/:id', (req, res) => {
    const { id } = req.params;
    let posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts.splice(idx, 1);
    writeCommunity(posts);
    res.json({ deleted: true });
});

// Unflag a community post
app.post('/api/community/:id/unflag', (req, res) => {
    const { id } = req.params;
    const posts = readCommunity();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found' });
    posts[idx].flagged = false;
    writeCommunity(posts);
    res.json({ flagged: false });
});

// Delete a comment on a community post
app.delete('/api/community/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    const posts = readCommunity();
    const post = posts.find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const idx = (post.comments || []).findIndex(c => c.id === commentId);
    if (idx === -1) return res.status(404).json({ error: 'Comment not found' });
    post.comments.splice(idx, 1);
    writeCommunity(posts);
    res.json({ deleted: true });
});

// Unflag a comment on a community post
app.post('/api/community/:postId/comments/:commentId/unflag', (req, res) => {
    const { postId, commentId } = req.params;
    const posts = readCommunity();
    const post = posts.find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const comment = (post.comments || []).find(c => c.id === commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.flagged = false;
    writeCommunity(posts);
    res.json({ flagged: false });
});

// User registration (sign up)
app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered.' });
    }
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already taken.' });
    }
    const hashed = await bcrypt.hash(password, 10);
    // Assign a random avatar
    const avatars = [
        { icon: 'fa-user', color: '#2563eb' },
        { icon: 'fa-user-astronaut', color: '#22c55e' },
        { icon: 'fa-user-ninja', color: '#f59e42' },
        { icon: 'fa-user-tie', color: '#764ba2' },
        { icon: 'fa-user-graduate', color: '#e53e3e' },
        { icon: 'fa-user-secret', color: '#b91c1c' },
        { icon: 'fa-user', color: '#1e293b' },
        { icon: 'fa-user', color: '#fbbf24' }
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const user = {
        id: Date.now().toString(),
        username,
        email,
        password: hashed,
        avatar: randomAvatar
    };
    users.push(user);
    writeUsers(users);
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar } });
});

// User login (sign in)
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar } });
});

// Get current user info from token
app.get('/api/auth/me', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        const users = readUsers();
        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ id: user.id, username: user.username, email: user.email, avatar: user.avatar });
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Prayer request server running on http://localhost:${PORT}`);
});