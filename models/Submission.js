const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    userEmail: String,
    workLink: String,
    submittedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Submission', submissionSchema);
