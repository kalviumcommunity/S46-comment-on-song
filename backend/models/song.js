const mongoose = require("mongoose")

const songScheme = new mongoose.Schema({
    title: String,
    link: String,
    artist: String,
    artLink: String,
    createdAt: { type: Date, default: Date.now },
    commentThreadID: { type: String, unique: true },
})

const Song = mongoose.model("songs", songScheme)

module.exports = Song
