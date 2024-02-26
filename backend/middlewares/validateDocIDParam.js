const mongoose = require("mongoose")

const validateDocIDParam = (req, res, next) => {
    let documentId = req.params.id

    if (!documentId || !mongoose.Types.ObjectId.isValid(documentId)) {
        console.log("Invalid document ID:", documentId)
        return res.status(400).json({ error: "Invalid document ID format" })
    }

    next()
}

module.exports = validateDocIDParam
