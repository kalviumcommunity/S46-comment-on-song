import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { CurrentSongContext } from "@/context/CurrentSongContext"
import Layout from "@/Layout"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Onboarding from "@/pages/Onboarding"
import Feed from "@/pages/Feed"
import Profile from "@/pages/Profile"
import Song from "@/pages/Song"
import "./App.css"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [currentSong, setCurrentSong] = useState([])

    return (
        <div className="container">
            <Header />
            <CurrentSongContext.Provider
                value={{ currentSong, setCurrentSong }}
            >
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Hero />} />
                        <Route path="feed" element={<Feed />} />
                        <Route path="song/:id" element={<Song />} />
                        {isLoggedIn ? (
                            <>
                                <Route path="profile" element={<Profile />} />
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
                            </>
                        )}
                    </Route>
                </Routes>
            </CurrentSongContext.Provider>
        </div>
    )
}

export default App
