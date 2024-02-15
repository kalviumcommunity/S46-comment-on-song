const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    userID: { type: String },
    commentText: { type: String },
    timestamp: { type: Date, default: Date.now },
})

const threadSchema = new mongoose.Schema({
    favoriteComments: [commentSchema], // Using commentSchema as the subdocument schema
    generalComments: [commentSchema], // Using commentSchema as the subdocument schema
})

const Thread = mongoose.model("comment-threads", threadSchema)

module.exports = Thread
