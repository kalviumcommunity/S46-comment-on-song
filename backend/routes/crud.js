const express = require("express")
const mongoose = require("mongoose")

const router = express.Router()

// Middleware to validate document ID format
const validateDocumentID = (req, res, next) => {
    const documentID = req.params.id

    if (!mongoose.Types.ObjectId.isValid(documentID)) {
        return res.status(400).json({ error: "Invalid document ID format" })
    }
    next()
}

const asyncHandler = (handler) => (req, res, next) =>
    handler(req, res, next).catch((err) => {
        console.error(err.message)
        res.status(500).json({ error: "Internal Server Error" })
    })

const createHandler = async (req, res) => {
    const newDocument = await req.Model.create(req.body)
    return res.status(201).json(newDocument)
}

const readHandler = async (req, res) => {
    const document = await req.Model.findById(req.params.id)

    if (!document) {
        return res.status(404).json({ error: "Document not found" })
    }

    return res.status(200).json(document)
}

const patchHandler = async (req, res) => {
    const updatedDocument = await req.Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    )

    if (!updatedDocument) {
        return res.status(404).json({ error: "Document not found" })
    }

    return res.status(200).json(updatedDocument)
}

const deleteHandler = async (req, res) => {
    const deletedDocument = await req.Model.findByIdAndDelete(req.params.id)

    if (!deletedDocument) {
        return res.status(404).json({ error: "Document not found" })
    }

    return res.status(204).send({ action: "successful" })
}

router.get("/:id", validateDocumentID, asyncHandler(readHandler))
router.post("/create", createHandler)
router.patch("/update/:id", validateDocumentID, asyncHandler(patchHandler))
router.delete("/delete/:id", validateDocumentID, asyncHandler(deleteHandler))

module.exports = router
