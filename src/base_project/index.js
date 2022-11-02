const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listings');

mongoose.connect('mongodb://localhost:27017/baseProject')
    .then(() => {
        console.log("Connection open...");
    }).catch((err) => {
        console.log("Something went wrong...");
        console.log(err)
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/', async(req, res) => {
    const listing = new Listing({});
    res.render('home');
});

const port = 1808
app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});