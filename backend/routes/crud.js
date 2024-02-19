const express = require("express")

const validateDocIDParam = require("../middlewares/validateDocIDParam")
const asyncHandler = require("../middlewares/asyncHandler")

const router = express.Router()

const createHandler = async (req, res) => {
    const newDocument = await req.Model.create(req.body)
    return res.status(201).json(newDocument)
}

const readHandler = async (req, res) => {
    const document = await req.Model.findById(req.params.id)

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

router.get("/:id", validateDocIDParam, asyncHandler(readHandler))
router.post("/create", createHandler)
router.patch("/update/:id", validateDocIDParam, asyncHandler(patchHandler))
router.delete("/delete/:id", validateDocIDParam, asyncHandler(deleteHandler))

module.exports = router
