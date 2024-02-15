import { Outlet } from "react-router-dom"
import Navigation from "@/components/Navigation"

function Layout() {
    return (
        <div className="app">
            <Outlet />
            <Navigation />
        </div>
    )
}

export default Layout
