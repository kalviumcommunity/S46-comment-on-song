const mongoose = require("mongoose")

const threadSchema = new mongoose.Schema({
    songID: { type: String, unique: true },
    favoriteComments: [
        {
            _id: { type: String, unique: true },
            userID: { type: String },
            commentText: { type: String },
            timestamp: { type: Date },
        },
    ],
    generalComments: [
        {
            _id: { type: String, unique: true },
            userID: { type: String },
            commentText: { type: String },
            timestamp: { type: Date },
        },
    ],
})

const Thread = mongoose.model("comment-threads", threadSchema)

module.exports = Thread
