import React from "react"
import { Link } from "react-router-dom"
import "./Profile.css"

function Profile() {
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
