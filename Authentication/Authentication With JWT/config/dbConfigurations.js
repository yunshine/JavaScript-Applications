// This file is essentially nothing more than a database connection...
const mongoose = require('mongoose');
const config = require('config'); // used to share the json value in the default.json file

// const mongoURI = process.env.DATABASEURL || 'mongodb://localhost:27017/jwt-Auth';
const mongoURI = config.get("mongoURI");


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
            // The options below are now deprecated in newer versions of Mongoose...
            // useCreateIndex: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Your "Authentication With JWT" project is connected to the Mongo database!');
    } catch (error) {
        console.log("Mongo database not connected...", error);
        process.exit(1);
    }
};

module.exports = connectDB;
