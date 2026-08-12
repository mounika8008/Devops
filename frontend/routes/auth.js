const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {

    const { username, password } = req.body;

    try {

        await db.query(
            "INSERT INTO students(username,password) VALUES($1,$2)",
            [username, password]
        );

        res.redirect("/");

    } catch (err) {

        console.log(err);

        res.send("Registration Failed");

    }

});

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const result = await db.query(
        "SELECT * FROM students WHERE username=$1 AND password=$2",
        [username, password]
    );

    if (result.rows.length > 0) {

        req.session.student = result.rows[0];

        res.redirect("/dashboard");

    } else {

        res.send("Invalid Login");

    }

});

module.exports = router;