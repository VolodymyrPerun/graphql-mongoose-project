const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorsSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Director', directorsSchema);
