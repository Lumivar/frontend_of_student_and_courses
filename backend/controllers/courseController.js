const Course = require("../models/Course");

//Create Course

exports.createcourse = async (req, res) => {
    try {
        const { coursename, amount, duration } = req.body;
        if (!coursename || !duration || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        else {
            const course = await Course.create({
                coursename,
                duration,
                amount
            });
            return res.status(201).json({
                success: true,
                message: "Course created successfully.",
                course
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Get All Courses

exports.getallcourse = async (req, res) => {
    try {
        const courses = await Course.find()
        return res.status(200).json({
            success: true,
            courses
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

//Get Course by ID

exports.getcourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }
        return res.status(200).json({
            success: true,
            course
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Update Course

exports.updatecourse = async (req, res) => {

    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

//Course delete

exports.deletecourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            course
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

