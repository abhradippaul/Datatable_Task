const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['to-do', 'in-progress', 'done'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true
    }
});

module.exports = model('Task', TaskSchema);
