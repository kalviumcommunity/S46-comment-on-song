import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "@/axios"
import "./Profile.css"

function Profile() {
    const [userId, setUserId] = useState("65bcc1c5f41bdebc943a50df")
    const [userFavSong, setUserFavSong] = useState(true)
    const [userFavSongId, setUserFavSongId] = useState(
        "65bcc1c5f41bdebc943a50df",
    )
    const [userFavSongData, setUserFavSongData] = useState(null)

    useEffect(() => {
        if (userFavSongId) {
            axios
                .get(`song/${userFavSongId}`)
                .then((res) => {
                    setUserFavSongData(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [userFavSongId])

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>Profile</h1>
                <div className="profile-card">
                    <img
                        src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=user-name`}
                        alt=""
                    />

                    <div className="profile-details">
                        <span className="profile-name">User Name</span>
                        <span className="profile-email">
                            alv12user@gmail.com
                        </span>
                    </div>

                    <div className="logout">
                        <button>Logout</button>
                    </div>
                </div>
            </div>
            <div className="profile-actions">
                {userFavSong && userFavSongData && (
                    <div className="profile-usersong">
                        <h1>Your favorite song</h1>
                        <div className="usersong">
                            <Link
                                to={`/song/${userFavSongId}`}
                                className="usersong-link"
                            >
                                <img
                                    className="usersong-art"
                                    src={`${userFavSongData.artLink}`}
                                    alt=""
                                />
                                <div className="usersong-details">
                                    <div className="usersong-title">
                                        {userFavSongData.title}
                                    </div>
                                    <div className="usersong-artist">
                                        {userFavSongData.artist}
                                    </div>
                                </div>
                            </Link>
                            <div className="usersong-actions">
                                <button className="usersong-edit">Edit</button>
                                <button className="usersong-remove">
                                    Remove favourite
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Link to="/addfavsong" className="action add">
                    <span className="add-sub">Click here to share</span>
                    <span className="add-heading">
                        Share your favourite <br /> song ↗️
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Profile
