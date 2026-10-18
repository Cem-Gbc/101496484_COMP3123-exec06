const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes.js');

// TODO - Update your mongoDB Atals Url here to Connect to the database
// The real connection string is kept in the .env file (see .env.example)
const DB_URL = process.env.DB_URL || "";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Add Note routes
app.use('/', noteRoutes);

// Connect to the database
mongoose.connect(DB_URL).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
    app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err.message);
    process.exit(1);
});
