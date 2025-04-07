require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Firebase Admin Init
const serviceAccount = require(path.join(__dirname, 'firebaseServiceKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// ✅ Firestore DB
const db = admin.firestore();

// ✅ Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ✅ Firestore Test Route
app.get('/test-firestore', async (req, res) => {
    try {
        const docRef = db.collection('test').doc('hello');
        await docRef.set({ message: 'SkillKart is live!' });
        const doc = await docRef.get();
        res.json(doc.data());
    } catch (error) {
        res.status(500).json({ error: 'Firestore test failed', details: error.message });
    }
});

// ✅ Mentor AI Route
const mentorRoutes = require('./routes/mentor');
app.use('/api', mentorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
