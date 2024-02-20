const express = require("express")

const Song = require("../models/song")

const router = express.Router()

const loadFeed = async (req, res) => {
    try {
        const songs = await Song.find().sort({ _id: -1 }).lean()
        res.json(songs)
    } catch (error) {
        console.error("Error loading feed:", error)
        res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

router.get("/", loadFeed)

module.exports = router
