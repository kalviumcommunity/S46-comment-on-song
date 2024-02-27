const express = require("express")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const asyncHandler = require("../middlewares/asyncHandler")
const User = require("../models/user")

const router = express.Router()

const JWT_EXP_IN = "30d"
const COOKIE_MAX_AGE = 2592000000 // 30 days in milliseconds

const loginSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
})

const signupSchema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm Password"),
})

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message)
        return res.status(401).json({ error: errorMessages.join(", ") })
    }
    next()
}

const generateJwtToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXP_IN,
            algorithm: "HS256",
        })

        return token
    } catch (error) {
        console.error("Error generating JWT token:", error)
        throw new Error("Failed to generate JWT token")
    }
}

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

    const token = await generateJwtToken(user._id.toString())

    res.cookie("token", token, {
        maxAge: COOKIE_MAX_AGE,
        sameSite: "none",
        secure: true,
    })

    res.status(200).json({ message: "Login successful" })
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

    const token = await generateJwtToken(newUser._id.toString())

    res.cookie("token", token, {
        maxAge: COOKIE_MAX_AGE,
        sameSite: "none",
        secure: true,
    })

    res.status(200).json({
        message: "User registered successfully",
    })
}

router.post("/login", validateRequest(loginSchema), asyncHandler(loginHandler))
router.post(
    "/signup",
    validateRequest(signupSchema),
    asyncHandler(signupHandler),
)

module.exports = router
