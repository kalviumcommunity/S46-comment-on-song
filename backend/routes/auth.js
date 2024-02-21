const express = require("express")
const bcrypt = require("bcrypt")

const router = express.Router()

const User = require("../models/user")

const loginHandler = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ userEmail: email })
    if (!user) {
        return res.status(400).json({
            error: "Email not found. Please sign up or try again.",
        })
    }

    const isMatch = await bcrypt.compare(password, user.userPassword)
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" })
    }

    res.status(200).json({ message: "Login successful", user: user })
}

const signupHandler = async (req, res) => {
    const { email, name, password, confirmPassword } = req.body

    const existingUser = await User.findOne({ userEmail: email })
    if (existingUser) {
        return res
            .status(400)
            .json({ error: "Email already registered. Please login" })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        userName: name,
        userEmail: email,
        userPassword: hashedPassword,
    })

    await newUser.save()

    res.status(200).json({
        message: "User registered successfully",
        user: newUser,
    })
}

router.post("/login", loginHandler)
router.post("/signup", signupHandler)

module.exports = router
