//Starts a server
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
});

// //Connects database
// const {mongoose} = require("./data/mongoose");
const dataStore = require('nedb');
const db = new dataStore('projects.db');
db.loadDatabase();

//Host static files and protect server from data dumps
app.use(express.static('client'));
app.use(express.json({limit: '1mb'}));

//Get route
app.get('/allPosts', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            console.log(err);
            return;
        }
        response.json(data);
    });
});

//Post route
app.post('/api', (request, response) => {
    const data = request.body;
    db.insert(data);
    response.json(data);
});