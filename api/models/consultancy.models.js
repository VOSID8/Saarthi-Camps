const mongoose = require('mongoose');

const ConsultancySchema = new mongoose.Schema({
    refugeeId: {
        type: String,
        ref: 'Refugee',
        required: true
    },
    service: {
        type: String,
        required: true
    },
    assignedDoctor: {
        type: String,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Pending', 'InProgress', 'Resolved'],
        default: 'Pending'
    },
    consultancyId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Consultancy", ConsultancySchema);