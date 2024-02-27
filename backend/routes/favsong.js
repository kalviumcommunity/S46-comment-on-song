const express = require("express")
const Joi = require("joi")

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

const validateReqBody = (req, res, next) => {
    const { error: inputError } = Joi.object({
        link: Joi.string().uri().required(),
        userId: Joi.string().required(),
        title: Joi.string().required(),
        artist: Joi.string().required(),
        comment: Joi.string().required(),
    }).validate(req.body)

    if (inputError) {
        return res.status(400).json({ error: inputError.details[0].message })
    }

    next()
}

// Middleware to generate song metadata
const generateSongAndThread = async (req, res, next) => {
    const { userId } = req
    const { link, comment, artist, title } = req.body

    const userDoc = await User.findById(userId).select("-userPassword")
    const createdBy = `${userDoc.userName} (${userDoc._id.toString().slice(-4)})`

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
            { createdBy, commentText: comment, timestamp: new Date() },
        ],
    })

    const songObject = {
        title,
        link: songLink,
        artist,
        artLink,
        commentThreadId: threadObject._id.toString(),
        createdBy,
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
    validateReqBody,
    asyncHandler(generateSongAndThread),
    asyncHandler(createSong),
)
router.patch("/edit/:id", validateReqBody, asyncHandler(editSong))
router.patch("/remove", asyncHandler(removeSong))

module.exports = router
