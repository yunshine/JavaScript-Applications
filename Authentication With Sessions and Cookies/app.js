const express = require("express");
const session = require("express-session");
const app = express();

// initialize middleware, which fires for every request to the server, with app() and pass it the session variable...
// the session variable below receives an object with options...
app.use(session({
    secret: 'this secret key will sign the cookie that is saved in the browser',
    resave: false, // for every request to the server, we want to create a new session
    saveUninitialized: false // if we have not touched or modified the session, we don't want it to save
}));

app.get('/', (req, res) => {
    res.send("Authentication With Sessions and Cookies");
});

app.listen(3030, () => {
    console.log("Welcome to Authentication With Sessions and Cookies! You've created a server using Express. The server has started and is now listening on port 3000...");
});

/* NOTES
The Full Stack Junkie Tuturial - https://www.youtube.com/watch?v=TDe7DRYK8vU
    - HTTP is a stateless protocol, so at the end of every request/respons cycle, the client and server forget about each other. In other words, user data will not be stored. So, without this user data, authentication and authorization cannot happen.
    - Thus, to create state, we can use sessions and cookies (we can also use tokens, but that's another method of authentication/authorization...).
            - When the client makes a request to our server, the server will automatically create a SESSION and store this SESSION in the database.
            - When the server responds to the client, it sends a COOKIE to the client which will be saved in the browser. This COOKIE is a reference which points to the session that was stored in the database because it contains the SESSION ID (see img1...).

    - The express-session packages -  sets the needed cookie for the specified session
*/