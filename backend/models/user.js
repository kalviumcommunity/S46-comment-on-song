const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userID: { type: String, unique: true },
	userName: String,
	userEmail: { type: String, unique: true },
	favoriteSong: { type: String, unique: true },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
