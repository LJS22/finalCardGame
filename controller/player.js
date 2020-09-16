const Player = require("../models/player");

exports.addPlayer = function (req, res, next) {
  const { username, time } = req.body;

  const newPlayer = new Player({ username, time });

  newPlayer.save((err) => {
    if (err) return next(err);
    else console.log(newPlayer.username, newPlayer.time);

    res.status(201).json({
      message: {
        msgBody: "User added successfully",
        msgError: false,
      },
    });
  });
};

exports.returnAllPlayers = function (req, res, next) {
  Player.find(function (err, players) {
    if (err) return next(err);
    res.json({
      status: "success",
      message: "Players retrieved successfully",
      data: players,
    });

    return players;
  });
};
