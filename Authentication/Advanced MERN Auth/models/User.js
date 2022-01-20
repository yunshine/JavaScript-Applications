
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs"); // used to encrypt/hash passwords...
const jwt = require('jsonwebtoken'); // tokens used for authorization, not authentication...
const crypto = require('crypto');

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
userSchema.pre("save", async function (next) {  // it's important to use the "function" keyword here instead of an arrow function because we need to use "this"...
    if (!this.isModified("password")) {  // we are checking if the password being passed in is modified or not. If not, it won't rehash it - it'll call next() instead - it'll just save the current password without rehashing it.
        next();
    }

    // if the password being passed has been modified, we need to hash it before we save it
    const salt = await bcrypt.genSalt(10); // the "10" is the salt, which is used to make the hash more random...
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// when a user tries to login, we'll use the function below to check if the password from the req.body matches the one in the database
userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password); // bcryptjs is used to compare the password in the req.body to the password in the database...
};

userSchema.methods.getSignedToken = function () {
    // create a payload and send a token (with the payload/user) to the frontend to tell the frontend that this user was successfully authenticated and is authorized to use the routes in this app...
    const payload = {
        _id: this._id
    };

    // generates a token...
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

// we'll use the function below when a user needs a token to reset their password
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // now that we have our resetToken, we want to hash it, then save it to "resetPasswordToken in the User Model", so...
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
};

module.exports = mongoose.model('User', userSchema);
