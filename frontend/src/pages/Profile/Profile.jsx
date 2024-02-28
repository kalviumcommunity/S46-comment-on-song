import React, { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setCookie } from "@/helpers/cookies"
import Loader from "@/components/Loader"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./Profile.css"

function Profile() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const {
        userObj,
        setUserExists,
        setUserObj,
        userFavSongData,
        setUserFavSongData,
    } = useContext(AppContext)

    const handleLogout = () => {
        if (confirm("Are you sure to logout?")) {
            setUserExists(false)
            setUserObj(null)
            setCookie("token", null, null)
            navigate("/")
        }
    }

    const removeFavSong = () => {
        setLoading(true)
        axios
            .patch("favsong/remove", {
                userId: userObj._id,
                userFavSong: userObj.favoriteSong,
            })
            .then(() => {
                setUserFavSongData(null)
                setUserObj({ ...userObj, favoriteSong: "" })
                alert("Favorite song removed successfully")
            })
            .catch((err) => {
                alert("Failed to remove favorite song")
            })
            .finally(() => setLoading(false))
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
        if (userObj && userObj.favoriteSong && !userFavSongData) {
            axios
                .get(`song/${userObj.favoriteSong}`)
                .then((res) => {
                    setUserFavSongData(res.data)
                })
                .catch((err) => {
                    alert("Failed to load favorite song")
                })
        }
    }, [userObj])

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
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="profile-actions">
                {userObj && userObj.favoriteSong ? (
                    <>
                        {userFavSongData ? (
                            <div className="profile-usersong">
                                <h1>Your favorite song</h1>
                                <div className="usersong">
                                    <Link
                                        to={`/song/${userObj.favoriteSong}`}
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
                                            onClick={() =>
                                                handleRemoveFavSong()
                                            }
                                        >
                                            Remove favourite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loader />
                        )}
                    </>
                ) : (
                    <Link to="/addfavsong" className="action add">
                        <span className="add-sub">Click here to share</span>
                        <span className="add-heading">
                            Share your favourite <br /> song ↗️
                        </span>
                    </Link>
                )}
                {loading && (
                    <div className="full-loader">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
