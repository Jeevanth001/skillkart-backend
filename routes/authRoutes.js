const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// REGISTER
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (doc.exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await userRef.set({ email, password, name, createdAt: new Date() });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = doc.data();
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({ message: 'Login successful', user: { email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

module.exports = router;
