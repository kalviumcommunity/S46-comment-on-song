import { useContext, useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { UserStatusContext } from "@/context/UserStatusContext"
import { CurrentSongContext } from "@/context/CurrentSongContext"
import { UserObjContext } from "@/context/UserObjContext"
import { UserIdContext } from "@/context/UserIdContext"
import { FavSongIdContext } from "@/context/FavSongIdContext"
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

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userObj, setUserObj] = useState(null)
    const [currentSong, setCurrentSong] = useState([])
    const [userFavSongId, setUserFavSongId] = useState(null)

    useEffect(() => {
        const userIdFromCookie = getCookie("userId")
        if (userIdFromCookie == "null") {
            setUserId(null)
        } else {
            setUserId(userIdFromCookie)
        }
    }, [])

    useEffect(() => {
        if (userId) {
            axios.defaults.headers.common["Authorization"] = userId
            axios
                .get("/user")
                .then((res) => {
                    setUserFavSongId(res.data.favoriteSong)
                    setUserObj(res.data)
                    setIsUserLoggedIn(true)
                })
                .catch((err) => console.error(err))
        }
    }, [userId])

    return (
        <div className="container">
            <UserStatusContext.Provider
                value={{ isUserLoggedIn, setIsUserLoggedIn }}
            >
                <UserIdContext.Provider value={{ userId, setUserId }}>
                    <UserObjContext.Provider value={{ userObj, setUserObj }}>
                        <CurrentSongContext.Provider
                            value={{ currentSong, setCurrentSong }}
                        >
                            <FavSongIdContext.Provider
                                value={{ userFavSongId, setUserFavSongId }}
                            >
                                <Header />
                                <Routes>
                                    <Route path="/" element={<Layout />}>
                                        <Route index element={<Hero />} />
                                        <Route path="feed" element={<Feed />} />
                                        <Route
                                            path="song/:id"
                                            element={<Song />}
                                        />
                                        {isUserLoggedIn ? (
                                            <>
                                                <Route
                                                    path="profile"
                                                    element={<Profile />}
                                                />
                                                <Route
                                                    path="addfavsong"
                                                    element={
                                                        <AddFavSong
                                                            page={"Add"}
                                                        />
                                                    }
                                                />
                                                <Route
                                                    path="editfavsong"
                                                    element={
                                                        <AddFavSong
                                                            page={"Edit"}
                                                        />
                                                    }
                                                />
                                                <Route
                                                    path="login"
                                                    element={
                                                        <Navigate
                                                            to="/feed"
                                                            replace={true}
                                                        />
                                                    }
                                                />
                                                <Route
                                                    path="signup"
                                                    element={
                                                        <Navigate
                                                            to="/feed"
                                                            replace={true}
                                                        />
                                                    }
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Route
                                                    path="signup"
                                                    element={<Onboarding />}
                                                />
                                                <Route
                                                    path="login"
                                                    element={<Onboarding />}
                                                />
                                                <Route
                                                    path="profile"
                                                    element={
                                                        <Navigate
                                                            to="/login"
                                                            replace={true}
                                                        />
                                                    }
                                                />
                                                <Route
                                                    path="addfavsong"
                                                    element={
                                                        <Navigate
                                                            to="/login"
                                                            replace={true}
                                                        />
                                                    }
                                                />
                                            </>
                                        )}
                                    </Route>
                                </Routes>
                            </FavSongIdContext.Provider>
                        </CurrentSongContext.Provider>
                    </UserObjContext.Provider>
                </UserIdContext.Provider>
            </UserStatusContext.Provider>
        </div>
    )
}

export default App
