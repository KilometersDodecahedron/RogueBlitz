const express = require("express");
// Import the modle to use it's db functions
const highScores = require("../models/highScores.js");

const router = express.Router();


router.get("/", (req, res) => {
    res.render("index");
});

//get the high scores
router.get("/api/highScores", (req, res) => {
    highScores.getAllScores(result => {
        res.json(result);
    });
});

//call and give data an object that has 'id' and 'score' properties
router.post("/api/highScores/newHighScore", (req, res) => {
    highScores.createNewHighScore([req.body.score], (result) => {
        res.status(200).end();
    });
});

module.exports = router;