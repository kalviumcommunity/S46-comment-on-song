const express = require("express")
const Joi = require("joi")

const getUserIdFromToken = require("../middlewares/getUserIdFromToken")
const validateUserId = require("../middlewares/validateUserId")
const asyncHandler = require("../middlewares/asyncHandler")

const Thread = require("../models/thread")
const User = require("../models/user")

const router = express.Router()

const commentSchema = Joi.object({
    comment: Joi.string().min(3).max(500).required(),
})

const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    next()
}

const addComment = async (req, res) => {
    const { userId } = req
    const { threadId } = req.params
    const { comment } = req.body

    const thread = await Thread.findById(threadId)

    const userDoc = await User.findById(userId).select("-userPassword")
    const createdBy = `${userDoc.userName} (${userDoc._id.toString().slice(-4)})`

    thread.generalComments.push({
        createdBy,
        commentText: comment,
        timestamp: new Date(),
    })

    await thread.save()

    res.status(201).send({ status: "success" })
}

router.use(getUserIdFromToken, validateUserId)

router.post("/new/:threadId", validateComment, asyncHandler(addComment))

module.exports = router
