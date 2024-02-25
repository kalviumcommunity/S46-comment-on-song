const express = require("express")

const getUserIdFromToken = require("../middlewares/getUserIdFromToken")
const validateUserId = require("../middlewares/validateUserId")
const asyncHandler = require("../middlewares/asyncHandler")

const getSongMetadata = require("../helpers/getSongMetadata")

const Song = require("../models/song")
const Thread = require("../models/thread")
const User = require("../models/user")

const router = express.Router()

const checkFavSongExistsForUser = async (userId) => {
    const user = await User.findById(userId)
    return user && user.favoriteSong ? true : false
}

// Middleware to generate song metadata
const generateSongAndThread = async (req, res, next) => {
    const { userId } = req
    const { link, comment, artist, title } = req.body

    const hasFavSong = await checkFavSongExistsForUser(userId)
    if (hasFavSong) {
        return res
            .status(400)
            .json({ error: "User already has a favorite song" })
    }

    const { link: songLink, artLink, error } = await getSongMetadata(link)

    if (error || !songLink || !artLink) {
        return res.status(400).json({ error: "Invalid link provided" })
    }

    const threadObject = await Thread.create({
        favoriteComments: [
            { userId, commentText: comment, timestamp: new Date() },
        ],
    })

    const songObject = {
        link: songLink,
        artLink,
        artist,
        title,
        commentThreadId: threadObject._id.toString(),
    }

    req.songObject = songObject

    next()
}

// Handler to create a new song
const createSong = async (req, res) => {
    const { songObject, userId } = req

    const newSong = await Song.create(songObject)
    await User.findByIdAndUpdate(userId, { favoriteSong: newSong._id })

    res.status(201).json(newSong)
}

const editSong = async (req, res) => {
    const { userId } = req
    const { link, comment, artist, title } = req.body
    const { id } = req.params

    const { link: songLink, artLink } = await getSongMetadata(link)

    const updatedSongData = { link: songLink, artLink, artist, title }
    const updatedSongDoc = await Song.findByIdAndUpdate(id, updatedSongData, {
        new: true,
    })

    const threadObject = await Thread.findById(updatedSongDoc.commentThreadId)
    const commentIndex = threadObject.favoriteComments.findIndex(
        (c) => c.userId === userId,
    )
    if (commentIndex !== -1) {
        threadObject.favoriteComments[commentIndex].commentText = comment
        threadObject.favoriteComments[commentIndex].timestamp = new Date()
        await threadObject.save()
    }

    res.status(200).json(updatedSongDoc)
}

const removeSong = async (req, res) => {
    const { userId } = req

    await User.findByIdAndUpdate(userId, { favoriteSong: "" })

    res.status(200).json({ message: "Favorite song removed successfully" })
}

router.use(getUserIdFromToken, validateUserId)

router.post(
    "/create",
    asyncHandler(generateSongAndThread),
    asyncHandler(createSong),
)
router.patch("/edit/:id", asyncHandler(editSong))
router.patch("/remove", asyncHandler(removeSong))

module.exports = router
