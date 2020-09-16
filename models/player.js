const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const Player = (module.exports = mongoose.model("Player", playerSchema));
