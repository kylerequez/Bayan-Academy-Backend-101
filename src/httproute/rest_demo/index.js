const express = require('express');
const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/fruit', (req, res) => {
    res.send("GET /fruit response");
});

app.post('/fruit', (req, res) => {
    const { fruit, qty } = req.body;
    if (qty == 1) {
        res.send(`Here is your ${qty} ${fruit}.`);
    }
    res.send(`Here are your ${qty} ${fruit}s.`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});