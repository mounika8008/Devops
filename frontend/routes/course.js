const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/dashboard", async (req, res) => {

    if (!req.session.student) {
        return res.redirect("/");
    }

    const courses = await db.query("SELECT * FROM courses");

    res.render("dashboard", {
        student: req.session.student,
        courses: courses.rows
    });

});

router.post("/enroll", async (req, res) => {

    const student = req.session.student;

    if (!student) {
        return res.redirect("/");
    }

    let selected = req.body.course;

    if (!selected) {
        return res.send("No course selected");
    }

    if (!Array.isArray(selected))
        selected = [selected];

    for (let id of selected) {

        await db.query(
            "INSERT INTO enrollments(student_id,course_id) VALUES($1,$2)",
            [student.id, id]
        );

    }

    res.render("success");

});

module.exports = router;