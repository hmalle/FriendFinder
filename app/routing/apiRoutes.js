
var friendsList = require("../data/friendsList");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  app.post("/api/friends", function(req,res){
    console.log("**req**"+JSON.stringify(req.body)); //TODO deelete this
    var match = { name: "", photo: "" };
    var newUser = req.body;
    console.log("new User: "+ JSON.stringify(newUser)); //TODO delete this
    var newUserName= newUser.name;
    var newUserPhoto = newUser.photo;
    var newUserScores = newUser["scores[]"];
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
    match.name = friendsList[matchId].name;
    match.photo = friendsList[matchId].photo;
 
    res.json(match);
  });
};

