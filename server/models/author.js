const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const author = mongoose.model("Author", authorSchema);
module.exports = author;