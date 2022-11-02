const { Schema } = require("mongoose");


const personSchema = new Schema({
    first: String,
    last: String
});

personSchema.virtual({'fullName'}.get(function() {
    return `${this.first} ${this.last}`
}))