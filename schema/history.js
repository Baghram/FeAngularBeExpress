const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  date: {
    type: Date,
  },
  amount: {
    type: String,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
