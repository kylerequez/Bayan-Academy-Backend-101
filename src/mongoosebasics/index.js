const mongoose = require('mongoose');

// Creates a connection through the string
// Another way of connecting
// const db = mongoose.connection;
// db.once('error', console.error.bind(console, 'connection error'));
// db.once('open', function() {
//     console.log("Connection Open");
// });
// 27017 is the default port for mongod and mongos instances. Can be changed in mongosh through the port or --port
const port = 27017;
const appName = "movieApp";
mongoose.connect(`mongodb://localhost:${port}/${appName}`)
    .then(() => {
        // Prints a message if it successfully connects
        console.log("Connection Open");
    })
    .catch(err => {
        // Prints the error if it does not connect
        console.log(`Error: ${err}`);
    });

// Creates a schema
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// Creates a moel
const Movie = mongoose.model('Movie', movieSchema);

const newMovie = new Movie({ title: "DC Super Pets", year: 2022, score: 5.6, rating: "E" });

// Movie.insertMany([
//         { title: "Burn Bright", year: 2019, score: 5.6, rating: "A" },
//         { title: "Tekken", year: 2020, score: 5.6, rating: "B" },
//         { title: "Testing", year: 2021, score: 5.6, rating: "C" },
//         { title: "Harbinger", year: 2022, score: 5.6, rating: "D" },
//         { title: "Spew man", year: 2023, score: 5.6, rating: "E" }
//     ])
//     .then(data => {
//         console.log("It worked");
//         console.log(data);
//     });

Movie.find();