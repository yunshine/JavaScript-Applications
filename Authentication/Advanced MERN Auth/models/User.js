const mongoose = require('mongoose');
const bcrypt = require("bcryptjs"); // used to encrypt/hash passwords...

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
    resetPasswordToken: String,
    resetPasswordExpire: Date
    // events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

// the middleware below is a Mongoose function that allows something to be done before ("pre") a User gets saved.
userSchema.pre("save", async function(next) {  // it's important to use the "function" keyword here instead of an arrow function because we need to use "this"...
    if (!this.isModified("password")) {  // we are checking if the password being passed in is modified or not. If not, it won't rehash it - it'll call next() instead - it'll just save the current password without rehashing it.
        next();
    }

    // if the password being passed has been modified, we need to hash it before we save it
    const salt = await bcrypt.genSalt(10); // the "10" is the salt, which is used to make the hash more random...
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
