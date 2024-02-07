const express = require("express");

const { startDB, stopDB, isConnected } = require("./db");
const crudRoutes = require("./routes/crud");
const UserSchema = require("./models/user");
const SongSchema = require("./models/song");

const app = express();
const port = 3000;

app.use(express.json());

// Logging request and response time
app.use((req, res, next) => {
	const start = Date.now();
	const logRequest = `[${new Date().toISOString()}] ${req.method} ${
		req.originalUrl
	}`;

	res.on("finish", () => {
		const duration = Date.now() - start;
		console.log(`${logRequest} - ${duration}ms`);
	});

	next();
});

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

const setModel = (req, res, next) => {
	if (req.baseUrl === "/user") {
		req.Model = UserSchema;
	} else if (req.baseUrl === "/song") {
		req.Model = SongSchema;
	}
	next();
};

app.use("/user", setModel, crudRoutes);
app.use("/song", setModel, crudRoutes);

app.listen(port, () => {
	console.log(`Server listening at port ${port}`);
});
