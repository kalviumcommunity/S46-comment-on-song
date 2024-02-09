import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Onboarding.css"

function Signup() {
    return (
        <>
            <div className="login">
                <h1>Signup</h1>
                <form className="on-form">
                    <div className="on-form-element">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Alice Bob" />
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="alice.bob@gmail.com" />
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="At least 8 characters"
                        />
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter the password"
                        />
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
    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <form className="on-form">
                    <div className="on-form-element">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="alice.bob@gmail.com" />
                    </div>
                    <div className="on-form-element">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="At least 8 characters"
                        />
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
            {path == "login" ? <Login /> : <Signup />}
        </div>
    )
}

export default Onboarding
