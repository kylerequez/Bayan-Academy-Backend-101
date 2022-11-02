const mongoose = require('mongoose');
const cities = require('./cities');
const helper = require('./seedHelpers');
const Listing = require('../models/listings');

mongoose.connect('mongodb://localhost:27017/baseProject')
    .then(() => {
        console.log("Connection open...");
    }).catch((err) => {
        console.log("Something went wrong...");
        console.log(err)
    });

const seedDB = async() => {
    await Listing.deleteMany({});
    for (city in cities) {
        const list = await new Listing({
            location: `${city.city}, ${city.admin_name}`
        });
        await list.save();
    }
};

seedDB();