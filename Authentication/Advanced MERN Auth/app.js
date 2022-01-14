require('dotenv').config({ path: './config.env' });
const express = require("express");
const connectDB = require('./config/db'); // mongoose/MongoDB settings imported from the db.js file in the config folder
const errorHandler = require('./middleware/error');

connectDB(); // to connect to database

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // this middleware is needed for incoming POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

// Middleware Routes
app.use('/api/auth', require('./routes/auth'));

// Error Handle Middleware (should be last middleware in app.js; in other words, there should be no app.use after this line)
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Welcome to Advanced MERN Auth! You've created a server using Express. The server has started and is now listening on port ${PORT}...`);
});

// handling MongoDB connection errors...
process.on("unhandledRejection", (error, promise) => {
    console.log(`MongoDB database not connected: ${error}.`);
    server.close(() => process.exit(1)); // stops the server without crashes with the status code of 1...
});


// const express = require("express");
// const session = require("express-session");
// const MongoDBSession = require("connect-mongodb-session")(session);  // this package is used to save our sessions to MongoDB...
// const mongoose = require("mongoose");
// const app = express();
// const User = require('./models/user');
// const userRoutes = require('./routes/users');

// // this will select the database url based on the environment that runs it...
// const mongoURL = process.env.DATABASEURL || 'mongodb://localhost:27017/sessions-and-cookies';
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true
//     // The options below are now deprecated in newer versions of Mongoose...
//     // useCreateIndex: true,
//     // useUnifiedTopology: true,
//     // useFindAndModify: false
// })
//     .then((res) => console.log('Your "Authentication With Sessions and Cookies" project is connected to the Mongo database!'))
//     .catch(error => console.log("Mongo database not connected...", error.message));

// // the store variable below is used to store sessions to MongoDB using the connect-mongodb-session package...
// const store = new MongoDBSession({
//     uri: mongoURL,
//     collection: 'mySessions'
// });

// app.set("view engine", "ejs"); // sets the default behavior of EJS so that it looks into the 'views' folder for the templates to render...
// // app.set('views', path.join(__dirname, '/views'));
// app.use(express.urlencoded({ extended: true })); // this middleware is used for request bodies so we have access to the req.body object...

// // use app.use() to initialize middleware. This now fires for every request to the server, and passes/adds the session variable to the req object...
// // the session variable below receives an object with options...
// app.use(session({
//     secret: 'this secret key will sign the cookie that is saved in the browser',
//     resave: false, // for every request to the server, do you want to create a new session?
//     saveUninitialized: false, // if we have not touched or modified the session, do you want to save?
//     store: store, // this option is used to connect the app to the sessions stored in MongoDB through the connect-mongodb-session package...
// }));

// // Routes
// app.use(userRoutes);

// app.listen(3000, () => {
//     console.log("Welcome to Authentication With Sessions and Cookies! You've created a server using Express. The server has started and is now listening on port 3000...");
// });

// /* NOTES
// The Full Stack Junkie Tuturial - https://www.youtube.com/watch?v=TDe7DRYK8vU
//     - HTTP is a stateless protocol, so at the end of every request/respons cycle, the client and server forget about each other. In other words, user data will not be stored. So, without this user data, authentication and authorization cannot happen.
//     - Thus, to create state, we can use sessions and cookies (we can also use tokens, but that's another method of authentication/authorization...).
//             - When the client makes a request to our server, the server will automatically create a SESSION and store this SESSION in the database.
//             - When the server responds to the client, it sends a COOKIE to the client which will be saved in the browser. This COOKIE is a reference which points to the session that was stored in the database because it contains the SESSION ID (see img1...).

//     - The express-session packages -  sets the needed cookie for the specified session. Another way to think of it is it creates the cookie and session. But remember, the session isn't saved in MongoDB yet until we bring in the connect-mongodb-session package.

//     - The connect-mongodb-session package is used to save our sessions to MongoDB. 
// */