const { mongoose } = require("mongoose")

// Middleware to validate document ID format
const validateDocumentID = (req, res, next) => {
    const documentID = req.params.id

    if (!mongoose.Types.ObjectId.isValid(documentID)) {
        return res.status(400).json({ error: "Invalid document ID format" })
    }
    next()
}

module.exports = validateDocumentID
