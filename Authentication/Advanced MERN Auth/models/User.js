const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 39
    },
    email: {
        type: String,
        // enum: ['user', 'admin'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // eventss: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('User', userSchema);
