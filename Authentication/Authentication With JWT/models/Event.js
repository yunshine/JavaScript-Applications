const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true
        }
    },
    { timestamps: true } // this option tells Mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
);

module.exports = mongoose.model('Event', eventSchema);
