const express = require("express");
const app = express();
const path = require("path");
const data = require('./kyle.json');
const port = 1001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "/public")));

// Home
app.get('/', (req, res) => {
    const home = data["home"];
    res.render('info', {
        ...home
    });
});

// About
app.get('/about', (req, res) => {
    const about = data["about"];
    res.render('info', {
        ...about
    });
});

// Contact
app.get('/contact', (req, res) => {
    const contact = data["contact"];
    res.render('info', {
        ...contact
    });
});