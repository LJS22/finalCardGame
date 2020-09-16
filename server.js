const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const dbConnection = require("./db/connection");
const cors = require("cors");
const bodyParser = require("body-parser");

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("react/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/react/build/index.html"));
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/cardgameleaderboard/v1", apiRouter);

module.exports = app;
