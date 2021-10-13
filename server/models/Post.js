const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To learn", "Learning", "Learned"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
});

module.exports = mongoose.model("post", postSchema);
