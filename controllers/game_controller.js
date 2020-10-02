const express = require("express");

const router = express.Router();


//starts the game by setting up the board
router.get("/", (req, res) => {


    var displayObject = {
        wall: true
    }
    res.render("index", displayObject);
});

router.put("/api/mainGame",  (req, res) => {
    res.render("index");
});

module.exports = router;