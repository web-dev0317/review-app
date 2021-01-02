const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    show_movie:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;