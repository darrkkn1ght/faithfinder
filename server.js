const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'prayer_requests.json');

// Serve static files (HTML, CSS, JS, images) from the project directory
app.use(express.static(__dirname));
const COMMUNITY_FILE = path.join(__dirname, 'community_wall.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = 'faithfinder_secret_key'; // Change this in production!

// MongoDB connection
mongoose.connect('mongodb+srv://darkknight:Peter_%23123@faithfindercluster.dum2hdb.mongodb.net/?retryWrites=true&w=majority&appName=faithfindercluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema/model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: String,
    profileImage: String,
    bio: String,
    verified: Boolean
});
const User = mongoose.model('User', userSchema);

// Prayer Request schema/model
const prayerRequestSchema = new mongoose.Schema({
    name: String,
    request: String,
    isAnonymous: Boolean,
    createdAt: { type: Date, default: Date.now },
    answered: { type: Boolean, default: false }
});
const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

// Community Wall schema/model
const commentSchema = new mongoose.Schema({
    message: String,
    createdAt: { type: Date, default: Date.now },
    flagged: { type: Boolean, default: false },
    avatar: Object
});
const communityPostSchema = new mongoose.Schema({
    type: { type: String, default: 'encouragement' },
    message: String,
    createdAt: { type: Date, default: Date.now },
    comments: [commentSchema],
    likes: { type: Number, default: 0 },
    flagged: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    avatar: Object
});
const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Helper to read/write JSON file
// MongoDB now handles all data, so these are no longer needed.

// Get all prayer requests
app.get('/api/prayer-requests', async (req, res) => {
    const requests = await PrayerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
});

// Submit a new prayer request
app.post('/api/prayer-requests', async (req, res) => {
    const { name, request, isAnonymous } = req.body;
    if (!request || typeof request !== 'string' || request.trim().length < 3) {
        return res.status(400).json({ error: 'Prayer request is too short.' });
    }
    const newRequest = await PrayerRequest.create({
        name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
        request: request.trim(),
        isAnonymous: !!isAnonymous
    });
    res.status(201).json(newRequest);
});

// Mark as answered
app.patch('/api/prayer-requests/:id/answered', async (req, res) => {
    const { id } = req.params;
    const request = await PrayerRequest.findById(id);
    if (!request) return res.status(404).json({ error: 'Not found' });
    request.answered = true;
    await request.save();
    res.json(request);
});

// Get all community wall posts
app.get('/api/community', async (req, res) => {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Submit a new community wall post
app.post('/api/community', async (req, res) => {
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
    const newPost = await CommunityPost.create({
        type: type || 'encouragement',
        message: message.trim(),
        avatar: randomAvatar
    });
    res.status(201).json(newPost);
});

// Add a comment to a community post
app.post('/api/community/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length < 1) {
        return res.status(400).json({ error: 'Comment is too short.' });
    }
    const post = await CommunityPost.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
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
        message: message.trim(),
        avatar: randomAvatar
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(post.comments[post.comments.length - 1]);
});

// Like a community post
app.post('/api/community/:id/like', async (req, res) => {
    const { id } = req.params;
    const post = await CommunityPost.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.json({ likes: post.likes });
});

// Flag a community post
app.post('/api/community/:id/flag', async (req, res) => {
    const { id } = req.params;
    const post = await CommunityPost.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.flagged = true;
    await post.save();
    res.json({ flagged: true });
});

// Flag a comment on a community post
app.post('/api/community/:postId/comments/:commentId/flag', async (req, res) => {
    const { postId, commentId } = req.params;
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const comment = post.comments.id(commentId) || post.comments.find(c => c._id.toString() === commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.flagged = true;
    await post.save();
    res.json({ flagged: true });
});

// Pin a community post
app.post('/api/community/:id/pin', async (req, res) => {
    const { id } = req.params;
    await CommunityPost.updateMany({}, { pinned: false });
    const post = await CommunityPost.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.pinned = true;
    await post.save();
    res.json({ pinned: true });
});

// Unpin a community post
app.post('/api/community/:id/unpin', async (req, res) => {
    const { id } = req.params;
    const post = await CommunityPost.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.pinned = false;
    await post.save();
    res.json({ pinned: false });
});

// Delete a community post
app.delete('/api/community/:id', async (req, res) => {
    const { id } = req.params;
    const post = await CommunityPost.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ deleted: true });
});

// Unflag a community post
app.post('/api/community/:id/unflag', async (req, res) => {
    const { id } = req.params;
    const post = await CommunityPost.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.flagged = false;
    await post.save();
    res.json({ flagged: false });
});

// Delete a comment on a community post
app.delete('/api/community/:postId/comments/:commentId', async (req, res) => {
    const { postId, commentId } = req.params;
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const idx = post.comments.findIndex(c => c._id.toString() === commentId);
    if (idx === -1) return res.status(404).json({ error: 'Comment not found' });
    post.comments.splice(idx, 1);
    await post.save();
    res.json({ deleted: true });
});

// Unflag a comment on a community post
app.post('/api/community/:postId/comments/:commentId/unflag', async (req, res) => {
    const { postId, commentId } = req.params;
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const comment = post.comments.id(commentId) || post.comments.find(c => c._id.toString() === commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.flagged = false;
    await post.save();
    res.json({ flagged: false });
});


// User registration (sign up)
app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: 'Email already registered.' });
        }
        if (await User.findOne({ username })) {
            return res.status(400).json({ error: 'Username already taken.' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
        const user = await User.create({ username, email, password: hashed, avatarUrl });
        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, avatarUrl: user.avatarUrl } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login (sign in)
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials.' });
        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, verified: user.verified } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Get current user info from token
app.get('/api/auth/me', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ id: user._id, username: user.username, email: user.email, avatarUrl: user.avatarUrl, profileImage: user.profileImage, bio: user.bio });
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Upload/update profile image
app.post('/api/auth/profile-image', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { image } = req.body;
        if (!image) {
            user.profileImage = '';
            await user.save();
            return res.json({ profileImage: '' });
        }
        if (typeof image !== 'string' || !image.startsWith('data:image/')) {
            return res.status(400).json({ error: 'Invalid image data.' });
        }
        user.profileImage = image;
        await user.save();
        res.json({ profileImage: image });
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Update username/email
app.post('/api/auth/update', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { username, email, bio } = req.body;
        if (!username || !email) return res.status(400).json({ error: 'Username and email required.' });
        // Check for duplicate username/email
        if (await User.findOne({ username, _id: { $ne: user._id } })) return res.status(400).json({ error: 'Username already taken.' });
        if (await User.findOne({ email, _id: { $ne: user._id } })) return res.status(400).json({ error: 'Email already registered.' });
        user.username = username;
        user.email = email;
        if (typeof bio === 'string') user.bio = bio;
        await user.save();
        res.json({ username, email, bio: user.bio });
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Change password
app.post('/api/auth/change-password', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).json({ error: 'All password fields required.' });
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) return res.status(400).json({ error: 'Current password is incorrect.' });
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ changed: true });
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Prayer request server running on http://localhost:${PORT}`);
});