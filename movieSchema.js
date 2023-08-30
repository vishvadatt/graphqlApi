const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = Schema({
    name : {
        type : String,
        required : true
    },
    rateing : {
        type : String
    },
    producer : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Movie',movieSchema);
