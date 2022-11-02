const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Connection open...");
    }).catch((err) => {
        console.log("Something went wrong...");
        console.log(err)
    });

// const p = new Product({
//     name: 'Grapes',
//     price: 50,
//     category: 'fruit'
// });

// p.save()
//     .then((p) => {
//         console.log(p);
//     }).catch((e) => {
//         console.log(e);
//     });

const seedProducts = [{
        name: 'Eggplant',
        price: 20.00,
        category: 'vegetable'
    },
    {
        name: 'Melon',
        price: 75.00,
        category: 'fruit'
    },
    {
        name: 'Watermelon',
        price: 50.00,
        category: 'fruit'
    },
    {
        name: 'Cheese',
        price: 100.00,
        category: 'dairy'
    }
];

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    });