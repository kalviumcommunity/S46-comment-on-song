const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: { type: String, unique: true },
    userPassword: { type: String },
    favoriteSong: { type: String, default: "" },
})

const User = mongoose.model("users", userSchema)

module.exports = User
