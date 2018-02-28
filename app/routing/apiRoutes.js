
var friendsList = require("../data/friendsList");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  app.post("/api/friends", function(req,res){
    var match = { name: "", photo: "" };
    var newUser = req.body;
    var newUserName= req.body.name;
    var newUserPhoto =req.body.photo;
    var newUserScores = req.body.scores;
    var minDifference = 1000;
    var currentDifference;
    var matchId ; //will be assigned to the one with the min difference.
    for(var i=0; i<friendsList.length; i++){
      currentDifference= 0;
      for(var j=0;j<friendsList[i].scores.length; j++){
        currentDifference+=(Math.abs( parseInt(newUserScores[j])-parseInt(friendsList[i].scores[j]) ));
      }
      if( currentDifference < minDifference ){
        minDifference = currentDifference;
        matchId = i;
      }
    }
    friendsList.push( req.body ); //add new user to the friendsList
    match.name = friendsList[matchid].name;
    match.photo = friendList[matchid].photo;
    res.json(match);
  });
};

