const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorID: String
});

const book = mongoose.model("Book", bookSchema);
module.exports = book;