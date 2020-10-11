var orm = require("../config/orm.js");

var score = {
  getAllScores: function(cb) {
    orm.all("high_scores ORDER BY score DESC LIMIT 10", function(res) {
      cb(res);
    });
  },
  // The variables vals is an arrays.
  // vals is an array of the new scores
  createNewHighScore: function(vals, cb) {
    orm.create("high_scores", "score", vals, function(res) {
      cb(res);
    });
  },
  // objColVals takes in {score: whatever the number is}
  // condition takes the ID 
  updateScore: function(objColVals, condition, cb) {
    orm.update("high_scores", objColVals, condition, function(res) {
        //keeps scores as Top 10
        orm.delete("high_scores", "id > 10;", function(){
            cb(res);
        });
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = score;