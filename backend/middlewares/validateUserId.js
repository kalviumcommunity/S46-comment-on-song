const mongoose = require("mongoose")

const validateUserId = (req, res, next) => {
    const { userId } = req

    if (!userId) {
        return res.status(401).json({ error: "User ID missing" })
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(401).json({ error: "Invalid user ID format" })
    }

    next()
}

module.exports = validateUserId
