const express = require('express');

const connectDB = require('./config/db'); // mongoose settings found in the config folder

const app = express();
connectDB();

app.use(express.json()); // Needed for incoming POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

// Middleware Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(3000, () => {
    console.log("Welcome to Authentication With JWT! You've created a server using Express. The server has started and is now listening on port 3000...");
});
