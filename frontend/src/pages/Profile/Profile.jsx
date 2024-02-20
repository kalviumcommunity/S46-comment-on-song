import React, { useContext, useEffect, useState } from "react"
import { UserObjContext } from "@/context/UserObjContext"
import { FavSongIdContext } from "@/context/FavSongIdContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "@/axios"
import "./Profile.css"

function Profile() {
    const navigate = useNavigate()

    const { userObj } = useContext(UserObjContext)
    const { userFavSongId, setUserFavSongId } = useContext(FavSongIdContext)

    const [userFavSongData, setUserFavSongData] = useState(null)

    const removeFavSong = () => {
        axios
            .patch("favsong/remove", {
                userId: userObj._id,
                userFavSong: userFavSongId,
            })
            .then(() => {
                setUserFavSongId(null)
                setUserFavSongData(null)
                alert("Favorite song removed successfully")
            })
            .catch((err) => {
                console.log(err)
                alert("Failed to remove favorite song")
            })
    }

    const handleEditFavSong = () => {
        navigate("/editfavsong")
    }

    const handleRemoveFavSong = () => {
        if (confirm("Are you sure to remove current fav song?")) {
            removeFavSong()
        }
    }

    useEffect(() => {
        if (userFavSongId) {
            axios
                .get(`song/${userFavSongId}`)
                .then((res) => {
                    setUserFavSongData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    alert("Failed to load favorite song")
                })
        }
    }, [userFavSongId])

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>Profile</h1>
                {userObj && (
                    <div className="profile-card">
                        <img
                            src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${userObj.userName}`}
                            alt=""
                        />

                        <div className="profile-details">
                            <span className="profile-name">
                                {userObj.userName}
                            </span>
                            <span className="profile-email">
                                {userObj.userEmail}
                            </span>
                        </div>

                        <div className="logout">
                            <button>Logout</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="profile-actions">
                {userFavSongData ? (
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
                                <button
                                    className="usersong-edit"
                                    onClick={() => handleEditFavSong()}
                                >
                                    Edit
                                </button>
                                <button
                                    className="usersong-remove"
                                    onClick={() => handleRemoveFavSong()}
                                >
                                    Remove favourite
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to="/addfavsong" className="action add">
                        <span className="add-sub">Click here to share</span>
                        <span className="add-heading">
                            Share your favourite <br /> song ↗️
                        </span>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Profile
