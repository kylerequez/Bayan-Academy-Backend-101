const express = require('express');

// requires path module that handles file directories
const path = require('path');

const app = express();
// Gets the data.json file inside the /templating folder
const redditData = require('./data.json');

// sets the directory that will contain static files as /public folder
app.use(express.static(path.join(__dirname, '/public')));

// Tells that ejs will be used as templating
app.set("view engine", "ejs");

// Tells the directory of the views folder
app.set("views", path.join(__dirname, "/views"));

app.get('/r/:subreddit', (req,res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    
    // console.log(data);
    if(data){
        res.render("subreddit", {
            // spread operator - spreads redditData variable
            ...data
        });
    } else {
        res.render("notfound", {
            subreddit
        });
    };
});

app.get('/', (req, res) => {
    // res.render assumes that views folder is already in the current directory of index.js
    res.render("home");
});

console.log(redditData);

app.get('/rand', (req,res) => {
    const rand = Math.floor(Math.random() * 10);
    const person = {
        name: "Kyle",
        age: 22
    };

    res.render("random", {
        rand,
        person
    });
});

app.get('/cats', (req,res) => {
    const cats = [
        "Lilo",
        "Garfield",
        "Schmoney",
        "Schumoney"
    ];

    res.render("cats", {cats});
});

let port = 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});