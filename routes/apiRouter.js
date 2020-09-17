const apiRouter = require("express").Router();
const { addPlayer, returnAllPlayers } = require("../controller/player");

apiRouter.route("/players").post(addPlayer);

apiRouter.route("/allplayers").get(returnAllPlayers);

module.exports = apiRouter;
