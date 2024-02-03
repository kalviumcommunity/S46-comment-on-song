const express = require("express");
const { startDB, stopDB, isConnected } = require("./db");

const app = express();
const port = 3000;

startDB();

app.get("/", (req, res) => {
	res.json({
		"📦 Database connection status": isConnected()
			? "✅ Connected"
			: "❌ Not connected",
	});
});

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.get("/start", async (req, res) => {
	let status = await startDB();
	res.send(status);
});

app.get("/close", async (req, res) => {
	let status = await stopDB();
	res.send(status);
});

app.listen(port, () => {
	console.log(`Server listening at port ${port}`);
});
