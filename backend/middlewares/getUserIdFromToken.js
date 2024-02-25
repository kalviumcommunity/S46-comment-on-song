const jwt = require("jsonwebtoken")

const getUserIdFromToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "No token provided" })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" })
    }

    next()
}

module.exports = getUserIdFromToken
