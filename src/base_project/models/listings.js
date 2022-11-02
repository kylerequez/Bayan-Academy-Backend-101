const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Listing', listingSchema);