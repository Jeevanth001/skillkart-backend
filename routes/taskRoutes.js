const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Submission = require('../models/Submission');

// 🔹 GET all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// 🔹 POST a submission
router.post('/submit', async (req, res) => {
    const { taskId, userEmail, workLink } = req.body;

    try {
        const submission = new Submission({ taskId, userEmail, workLink });
        await submission.save();
        res.status(201).json({ message: 'Submission successful!' });
    } catch (err) {
        res.status(500).json({ error: 'Submission failed' });
    }
});

module.exports = router;
