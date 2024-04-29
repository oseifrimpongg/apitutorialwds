const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  subscribedToChannel: { type: String, required: true, default: Date.now() },
});

module.exports = mongoose.model("Subscriber", subSchema);
