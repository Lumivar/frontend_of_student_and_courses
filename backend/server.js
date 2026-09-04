require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");

const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors({
    origin:"*"
}));

connectDB();

app.use(express.json());

app.use("/students", studentRoutes);

app.use("/courses", courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});