const express = require("express");
const app = express();

console.log(app);
const port = 3000;

// This listens for requests on the server port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// direct match routes
// Home page route '/'
app.get('/',(req, res) => {
    if(req.method != "GET"){
        throw new Exception("Wrong Request Method");
    };
    res.send("You've landed in the home page.") // res.send() - used to send back content
});

// Cats page '/cats'
app.get('/cats',(req, res) => {
    res.send("Meow!") // res.send() - used to send back content
});

// Dogs page '/dogs'
app.get('/dogs',(req, res) => {
    res.send("Arf!") // res.send() - used to send back content
});

// patterned route
app.get(`/name=:name/id=:id`, (req, res) => {
    const {name, id} = req.params;
    res.send({
        name: name,
        id: id
    });
});

// query string
app.get('/search', (req, res) => {
    const {q} = req.query; // req.query gets the query string in key value pairs
    if(!q) res.send("Nothing found!");
    res.send(`You have searched for ${q}`);
});

// Error
app.use(`*`, (req, res) => {
    res.send("This path has not been implemented yet.");
});

// app.use((req, res) => {
//     console.log("New Request!");
//     // console.log(req); // Request Object from Express
//     // console.log(res); // Response Object from Express
//     res.send(req.method);
// });