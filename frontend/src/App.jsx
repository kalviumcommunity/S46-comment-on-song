import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { CurrentSongContext } from "@/context/CurrentSongContext"
import { UserObjContext } from "@/context/UserObjContext"
import { FavSongIdContext } from "@/context/FavSongIdContext"
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
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userId, setUserId] = useState("65bcbffe7ffa1414707f25d0")
    const [userObj, setUserObj] = useState(null)
    const [currentSong, setCurrentSong] = useState([])
    const [userFavSongId, setUserFavSongId] = useState(null)

    useEffect(() => {
        if (userId) {
            axios.defaults.headers.common["Authorization"] = userId
            axios
                .get("/user")
                .then((res) => {
                    setUserFavSongId(res.data.favoriteSong)
                    setUserObj(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [userId])

    return (
        <div className="container">
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
                                <Route path="song/:id" element={<Song />} />
                                {isLoggedIn ? (
                                    <>
                                        <Route
                                            path="profile"
                                            element={<Profile />}
                                        />
                                        <Route
                                            path="addfavsong"
                                            element={
                                                <AddFavSong page={"Add"} />
                                            }
                                        />
                                        <Route
                                            path="editfavsong"
                                            element={
                                                <AddFavSong page={"Edit"} />
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
        </div>
    )
}

export default App
