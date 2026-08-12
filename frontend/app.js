const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "studentcourseapp",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/", authRoutes);
app.use("/", courseRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});