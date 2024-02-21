import { useContext } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navigation from "@/components/Navigation"
import AddFavSongBtn from "@/components/AddFavSongBtn"
import { AppContext } from "@/App"

function Layout() {
    const location = useLocation().pathname
    const { userFavSongId } = useContext(AppContext)

    return (
        <div className="app">
            <Outlet />
            <Navigation />
            {location === "/feed" && userFavSongId === "" && <AddFavSongBtn />}
        </div>
    )
}

export default Layout
