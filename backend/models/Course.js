const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({

    coursename: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },

    duration: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);