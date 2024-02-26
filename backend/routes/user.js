const express = require("express")

const getUserIdFromToken = require("../middlewares/getUserIdFromToken")
const validateUserId = require("../middlewares/validateUserId")
const asyncHandler = require("../middlewares/asyncHandler")

const User = require("../models/user")

const router = express.Router()

const readUserHandler = async (req, res) => {
    const { userId } = req

    if (userId) {
        const document = await User.findById(userId).select("-userPassword")

        return res.status(200).json(document)
    }

    return res.status(401).send("Invalid or missing authentication credentials")
}

router.use(getUserIdFromToken, validateUserId)

router.get("/", asyncHandler(readUserHandler))

module.exports = router
