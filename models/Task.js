const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    skill: String, // Optional: Use for filtering tasks by skill
});

module.exports = mongoose.model('Task', taskSchema);
