import React from "react"
import { useLocation, Link } from "react-router-dom"
import "./Navigation.css"

function Navigation() {
    const location = useLocation().pathname

    return (
        <div className="navigation">
            <Link to="/feed" className="navi navi-feed">
                <div
                    className={`navi-activity ${location === "/feed" && "navi-active"}`}
                >
                    <img src="/icons/feed.svg" alt="" />
                </div>
                <span>Feed</span>
            </Link>
            <Link to="/profile" className="navi navi-profile">
                <div
                    className={`navi-activity ${
                        (location === "/profile" ||
                            location === "/signup" ||
                            location === "/login") &&
                        "navi-active"
                    }`}
                >
                    <img src="/icons/profile.svg" alt="" />
                </div>
                <span>Profile</span>
            </Link>
        </div>
    )
}

export default Navigation
