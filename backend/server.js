require("dotenv").config()

const express = require("express")
const cors = require("cors")

const { startDB, stopDB, isConnected } = require("./db")

const auth = require("./routes/auth")
const feed = require("./routes/feed")
const userRoutes = require("./routes/user")
const crudRoutes = require("./routes/crud")
const favsong = require("./routes/favsong")

const UserSchema = require("./models/user")
const SongSchema = require("./models/song")
const ThreadSchema = require("./models/thread")

const app = express()
const port = 3000

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200,
        credentials: true,
    }),
)

app.use(express.json())

// Logging request and response time
app.use((req, res, next) => {
    const start = Date.now()
    const logRequest = `[${new Date().toISOString()}] ${req.method} ${
        req.originalUrl
    }`

    res.on("finish", () => {
        const duration = Date.now() - start
        console.log(`${logRequest} - ${duration}ms`)
    })

    next()
})

startDB()

app.get("/", (req, res) => {
    res.json({
        "📦 Database connection status": isConnected()
            ? "✅ Connected"
            : "❌ Not connected",
    })
})

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.get("/start", async (req, res) => {
    let status = await startDB()
    res.send(status)
})

app.get("/close", async (req, res) => {
    let status = await stopDB()
    res.send(status)
})

const setModel = (req, res, next) => {
    if (req.baseUrl === "/user") {
        req.Model = UserSchema
    } else if (req.baseUrl === "/song") {
        req.Model = SongSchema
    } else if (req.baseUrl === "/thread") {
        req.Model = ThreadSchema
    }
    next()
}

app.use("/auth", auth)
app.use("/feed", feed)
app.use("/favsong", favsong)
app.use("/user", userRoutes)

app.use("/song", setModel, crudRoutes)
app.use("/thread", setModel, crudRoutes)

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})
