const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date
    },
    // Reference to the User who owns this task
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Must match the model name used for users
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
