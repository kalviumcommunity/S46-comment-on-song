import { useLocation, Link, Outlet } from "react-router-dom"
import "./Layout.css"

function Layout() {
    const location = useLocation().pathname

    return (
        <div className="app">
            <Outlet />
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
        </div>
    )
}

export default Layout
