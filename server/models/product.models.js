const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: [true, "Reviewer name is required"],
        minlength: [3, "Reviewer name should have at least 3 characters"]
    },
    movieName: {
        type: String,
        required: [true, "Movie name is required"],
        minlength: [3, "Movie name should have at least 3 characters"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [0, "Rating should be between 0 and 10"],
        max: [10, "Rating should be between 0 and 10"]
    },
    reviewText: {
        type: String,
        required: [true, "Review text is required"],
        maxlength: [500, "Review text should not exceed 500 characters"]
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;


