const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    name: String,
    genre: String,
    directorId: String
});

module.exports = mongoose.model('Movie', moviesSchema);
