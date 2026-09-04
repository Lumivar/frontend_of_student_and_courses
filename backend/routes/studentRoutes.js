const express = require("express");

const router = express.Router();

const {verification} = require("../middleware/auth");

const {

    createStudent,
    getStudents,
    forgetpassword,
    getStudent,
    searchstudent,
    loginstudent,
    updateStudent,
    deleteStudent

} = require("../controllers/studentController");

router.get("/",verification,getStudents);

router.post("/register", createStudent);

router.get("/allstudents", getStudents);

router.put("/forgetpassword", forgetpassword);

router.get("/getdetails/:id", getStudent);

router.post("/search",searchstudent);
  
router.post("/login", loginstudent);

router.put("/updatedetails/:id", updateStudent);

router.delete("/deletedetails/:id", deleteStudent);

module.exports = router;