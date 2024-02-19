const express = require("express")

const validateDocIDAuth = require("../middlewares/validateDocIDAuth")
const asyncHandler = require("../middlewares/asyncHandler")

const UserModel = require("../models/user")

const router = express.Router()

const readUserHandler = async (req, res) => {
    const userId = req.headers.authorization

    const document = await UserModel.findById(userId)

    return res.status(200).json(document)
}

router.get("/", validateDocIDAuth, asyncHandler(readUserHandler))

module.exports = router
