import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { setCookie } from "@/helpers/cookies"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./Onboarding.css"

function Signup() {
    const { setUserExists } = useContext(AppContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm()

    const password = watch("password", "")

    const onSignup = (values) => {
        axios
            .post("auth/signup", values)
            .then((res) => {
                setUserExists(true)
                setCookie("token", res.data.token, 30)
                alert(res.data.message)
            })
            .catch((err) => {
                if (err.response.data.error) {
                    alert(err.response.data.error)
                } else {
                    alert("Failed connecting to server. Try again later")
                }
            })
    }

    return (
        <>
            <div className="on-container">
                <h1>Signup</h1>
                <form className="on-form" onSubmit={handleSubmit(onSignup)}>
                    <div className="on-form-element">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: "Please enter your name",
                            })}
                        />
                        {errors.name && (
                            <span className="on-form-err">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="username"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="on-form-err">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            minLength="8"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="on-form-err">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className="on-form-err">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                    <div className="on-form-element">
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
            <hr />
            <button className="on-google">
                <img
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                    alt=""
                />
                <span>Signup with Google</span>
            </button>
            <div className="on-instead">
                <span>
                    Already have an account? <Link to="/login">Log in</Link>
                </span>
            </div>
        </>
    )
}

function Login() {
    const { setUserExists } = useContext(AppContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onLogin = (values) => {
        axios
            .post("auth/login", values, { withCredentials: true })
            .then((res) => {
                setUserExists(true)
                setCookie("token", res.data.token, 30)
                alert(res.data.message)
            })
            .catch((err) => {
                if (err.response.data.error) {
                    alert(err.response.data.error)
                } else {
                    alert("Failed connecting to server. Try again later")
                }
            })
    }

    return (
        <>
            <div className="on-container">
                <h1>Login</h1>
                <form className="on-form" onSubmit={handleSubmit(onLogin)}>
                    <div className="on-form-element">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="username"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="on-form-err">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="on-form-err">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="on-form-element">
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
            <hr />
            <button className="on-google">
                <img
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                    alt=""
                />
                <span>Login with Google</span>
            </button>
            <div className="on-instead">
                <span>
                    Have no account? <Link to="/signup">Sign Up</Link>
                </span>
            </div>
        </>
    )
}

function Onboarding() {
    const location = useLocation()
    const [path, setPath] = useState("login")

    useEffect(() => {
        if (location.pathname == "/signup") {
            setPath("signup")
        } else if (location.pathname == "/login") {
            setPath("login")
        }
    }, [location])

    return (
        <div className="onboarding">
            <div className="onboarding-container">
                {path == "login" ? <Login /> : <Signup />}
            </div>
        </div>
    )
}

export default Onboarding
