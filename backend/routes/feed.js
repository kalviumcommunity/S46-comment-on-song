const express = require("express");

const SongSchema = require("../models/song");

const router = express.Router();

const loadFeed = async (req, res) => {
	try {
		const songs = await SongSchema.find().lean();
		res.json(songs);
	} catch (error) {
		console.error("Error loading feed:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
};

router.get("/", loadFeed);

module.exports = router;
