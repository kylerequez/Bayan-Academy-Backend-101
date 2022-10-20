var giveMeAJoke = require('give-me-a-joke');
var colors = require('colors')
// console.log(giveMeAJoke);

giveMeAJoke.getRandomDadJoke((joke) => {
    console.log(`Dad says: ${joke.rainbow}`);
});

// var name = "Jhosua";
// var surname = "Surname";
// giveMeAJoke.getCustomJoke(name, surname, (joke) =>{
//     console.log(`Dad says: ${joke}`);
// });