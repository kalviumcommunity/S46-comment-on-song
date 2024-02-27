import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { getCookie } from "@/helpers/cookies"
import Layout from "@/Layout"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Onboarding from "@/pages/Onboarding"
import Feed from "@/pages/Feed"
import Profile from "@/pages/Profile"
import Song from "@/pages/Song"
import AddFavSong from "@/pages/AddFavSong"
import axios from "@/axios"
import "./App.css"

export const AppContext = React.createContext()

function App() {
    const [userExists, setUserExists] = useState(false)
    const [userObj, setUserObj] = useState(null)
    const [userFavSongData, setUserFavSongData] = useState(null)
    const [currentSong, setCurrentSong] = useState([])

    useEffect(() => {
        const tokenFromCookie = getCookie("token")
        if (tokenFromCookie === "null") {
            setUserExists(false)
            setUserObj(null)
        } else {
            setUserExists(true)
            axios
                .get("/user", {
                    headers: {
                        Authorization: `Bearer ${tokenFromCookie}`,
                    },
                })
                .then((res) => {
                    setUserObj(res.data)
                })
                .catch((err) => console.error(err))
        }
    }, [userExists])

    const appContextValue = {
        userExists,
        userObj,
        currentSong,
        setUserExists,
        setUserObj,
        setCurrentSong,
        userFavSongData,
        setUserFavSongData,
    }

    return (
        <div className="container">
            <AppContext.Provider value={appContextValue}>
                <Header />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Hero />} />
                        <Route path="feed" element={<Feed />} />
                        <Route path="song/:id" element={<Song />} />
                        {userExists ? (
                            <>
                                <Route path="profile" element={<Profile />} />
                                <Route
                                    path="addfavsong"
                                    element={<AddFavSong page={"Add"} />}
                                />
                                <Route
                                    path="editfavsong"
                                    element={<AddFavSong page={"Edit"} />}
                                />
                                <Route
                                    path="login"
                                    element={
                                        <Navigate to="/feed" replace={true} />
                                    }
                                />
                                <Route
                                    path="signup"
                                    element={
                                        <Navigate to="/feed" replace={true} />
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <Route path="signup" element={<Onboarding />} />
                                <Route path="login" element={<Onboarding />} />
                                <Route
                                    path="profile"
                                    element={
                                        <Navigate to="/login" replace={true} />
                                    }
                                />
                                <Route
                                    path="addfavsong"
                                    element={
                                        <Navigate to="/login" replace={true} />
                                    }
                                />
                            </>
                        )}
                    </Route>
                </Routes>
            </AppContext.Provider>
        </div>
    )
}

export default App
