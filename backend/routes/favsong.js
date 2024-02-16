const express = require("express")
const asyncHandler = require("../middlewares/asyncHandler")
const getSongMetadata = require("../helpers/getSongMetadata")
const SongModel = require("../models/song")
const ThreadModel = require("../models/thread")
const UserModel = require("../models/user")

const router = express.Router()

// Middleware to generate song metadata
const generateSongObject = async (req, res, next) => {
    try {
        // Fetch metadata for the song
        const { link, artLink } = await getSongMetadata(req.body.link)

        // Create a new thread for comments
        const threadObject = await ThreadModel.create({
            favoriteComments: [],
        })

        // Add comment to the thread
        threadObject.favoriteComments.push({
            userID: req.body.userId,
            commentText: req.body.comment,
            timestamp: new Date(),
        })
        await threadObject.save()

        // Create song object
        const songObject = {
            link: link,
            artLink: artLink,
            artist: req.body.artist,
            title: req.body.title,
            commentThreadID: threadObject._id.toString(),
        }

        // Attach song object to request
        req.songObject = songObject

        next()
    } catch (err) {
        console.error("Error generating song metadata:", err.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// Handler to create a new song
const createHandler = async (req, res) => {
    try {
        // Create a new song using the provided song object
        if (req.songObject) {
            const newSong = await SongModel.create(req.songObject)
            res.status(201).json(newSong)
        } else {
            res.status(400).json({ message: "User already have fav song" })
        }
    } catch (err) {
        console.error("Error creating song:", err.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

router.post("/create", generateSongObject, asyncHandler(createHandler))

module.exports = router
