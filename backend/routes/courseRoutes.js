const express = require("express");

const router = express.Router();

const {

   createcourse,
   getallcourse,
   getcourse,
   updatecourse,
   deletecourse 

} = require("../controllers/courseController");

router.post("/registercourse", createcourse);

router.get("/allcourses", getallcourse);

router.get("/course/:id", getcourse);

router.put("/updatecourse/:id", updatecourse);

router.delete("/deletecourses/:id", deletecourse);

module.exports = router;