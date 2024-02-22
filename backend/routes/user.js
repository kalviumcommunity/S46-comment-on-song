const express = require("express")
var jwt = require("jsonwebtoken")

const validateDocIDAuth = require("../middlewares/validateDocIDAuth")
const asyncHandler = require("../middlewares/asyncHandler")

const UserModel = require("../models/user")

const router = express.Router()

const readUserHandler = async (req, res) => {
    const TOKEN = req.headers.authorization.split(" ")[1]

    if (TOKEN) {
        const user = jwt.verify(TOKEN, process.env.JWT_SECRET)

        const document = await UserModel.findById(user.userId).select(
            "-userPassword",
        )

        return res.status(200).json(document)
    }

    return res.status(401).send("Invalid or missing authentication credentials")
}

router.get("/", asyncHandler(readUserHandler))

module.exports = router
