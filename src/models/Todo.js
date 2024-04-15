const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
