import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navigation from "@/components/Navigation"
import AddFavSongBtn from "@/components/AddFavSongBtn"

function Layout() {
    const location = useLocation().pathname
    const [usersFavSong, setUsersFavSong] = useState(null)

    return (
        <div className="app">
            <Outlet />
            <Navigation />
            {location === "/feed" && <AddFavSongBtn />}
        </div>
    )
}

export default Layout
