import { useContext } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { FavSongIdContext } from "@/context/FavSongIdContext"
import Navigation from "@/components/Navigation"
import AddFavSongBtn from "@/components/AddFavSongBtn"

function Layout() {
    const location = useLocation().pathname
    const { userFavSongId } = useContext(FavSongIdContext)

    return (
        <div className="app">
            <Outlet />
            <Navigation />
            {location === "/feed" && userFavSongId === "" && <AddFavSongBtn />}
        </div>
    )
}

export default Layout
