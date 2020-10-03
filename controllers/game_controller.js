const express = require("express");

const router = express.Router();


//starts the game by setting up the board
router.get("/", (req, res) => {
    res.render("index");
});

router.put("/api/mainGame",  (req, res) => {
    res.render("index");
});

module.exports = router;