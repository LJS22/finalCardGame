const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const dbConnection = require("./db/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/client/build/index.html"));
//   });
// }

app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/cardgameleaderboard", apiRouter);

module.exports = app;
