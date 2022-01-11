const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username."], // the second value in the array (index 1) is an error message.
        minLength: 2,
        maxLength: 39
    },
    email: {
        type: String,
        required: [true, "Please provide an email address."], // the second value in the array (index 1) is an error message.
        unique: true, 
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email address."] // the email address much match the regex at index 0.
        // enum: ['user', 'admin']
    },
    password: {
        type: String,
        required: [true, "Please provide a password."], // the second value in the array (index 1) is an error message.
        minLength: 6,
        select: false // select() is a Mongoose method used to select document fields that are to be returned in the query result.
    },
    // events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('User', userSchema);
