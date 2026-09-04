const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create Student

exports.createStudent = async (req, res) => {
    try {

        // Get data from request body
        const { name, email, password, contact, stream } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !contact || !stream) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format."
            });
        }

        // Contact validation (10 digits)
        if (!/^[0-9]{10}$/.test(contact)) {
            return res.status(400).json({
                success: false,
                message: "Contact number must be 10 digits."
            });
        }

        // Check if email already exists
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create student
        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            contact,
            stream
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully.",
            student
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Get All Students

exports.getStudents = async (req, res) => {

    try {

        const students = await Student.find();

        res.json({'students': students, message: true});

    } catch (err) {

        res.status(500).json({ message: false });

    }

};
// Forgot Password

exports.forgetpassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingStudent = await Student.findOne({ "email": email })
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.findByIdAndUpdate(
            existingStudent._id,
            { password: hashedPassword },
            { new: true }
        );
        res.json(student);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get Student by ID

exports.getStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student)
            return res.status(404).json({ message: "Student not found" });

        res.json({'student': student});

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

// Search Student

exports.searchstudent = async (req,res) => {
    
    try {
        const {search} = req.body;

        if(!search){

            return res.status(400).json({
                success:false,
                message:"Search value is required"
            });
        }

        const students = await Student.find({
            $or:[
                {name:{$regex:search,$options:"i"}},
                {contact:{$regex:search,$options:"i"}}
            ]
        });
        
        if(students.length===0){
            return res.status(400).json({
                success:false,
                message:"Student not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Student found successfully.",
            "students": students
        });
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Login Student

exports.loginstudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Both email and password are required" })
        }
        const existingStudent = await Student.findOne({ "email": email })
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found." });
        }
        const match = await bcrypt.compare(password, existingStudent.password)
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            })
        }
        const token = jwt.sign({
            id: existingStudent.id,           
            email:existingStudent.email
        },
        process.env.JWT_SECRETKEY,
        {
            expiresIn: "1hr"
        }
        );
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            student: {
                id: existingStudent._id,
                name: existingStudent.name,
                email: existingStudent.email,
                contact: existingStudent.contact,
                stream: existingStudent.stream
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update Student

exports.updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        res.json(student);

    } catch (err) {

        res.status(500).json({ message: err.message });
    }
};

// Delete Student

exports.deleteStudent = async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student Deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};