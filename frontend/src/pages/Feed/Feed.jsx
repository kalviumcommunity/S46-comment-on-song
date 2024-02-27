import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./Feed.css"

function Feed() {
    const { setCurrentSong } = useContext(AppContext)

    const [songs, setSongs] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [filteredSongs, setFilteredSongs] = useState([])

    const handleSelectChange = (event) => {
        setSelectedUser(event.target.value)
    }

    const updateCurrentSong = (song) => {
        setCurrentSong(song)
    }

    useEffect(() => {
        axios
            .get("/feed")
            .then((res) => {
                setSongs(res.data)
                const allUsers = res.data.map((song) => song.createdBy)
                const uniqueUsers = [...new Set(allUsers)]
                setUsers(uniqueUsers)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (selectedUser === "") setFilteredSongs(songs)
        else {
            const filtered = songs.filter(
                (song) => song.createdBy === selectedUser,
            )
            setFilteredSongs(filtered)
        }
    }, [selectedUser, songs])

    return (
        <div className="feed">
            <div className="feed-container">
                <h1 className="feed-header">
                    Discover <i>comments</i> on song
                </h1>
                <div className="dropdown">
                    <span>Filter by user:</span>
                    &nbsp;
                    <select value={selectedUser} onChange={handleSelectChange}>
                        <option value="">Everyone</option>
                        {users.map((user, index) => (
                            <option value={user} key={index}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                {filteredSongs && (
                    <>
                        {filteredSongs.map((song, index) => (
                            <Link
                                to={`/song/${song._id}`}
                                className="song"
                                key={index}
                                onClick={() => updateCurrentSong(song)}
                            >
                                <img className="song-art" src={song.artLink} />
                                <div className="song-details">
                                    <span className="song-id">
                                        #{song._id.slice(-5)}
                                    </span>
                                    <span className="song-title">
                                        {song.title}
                                    </span>
                                    <span className="song-artist">
                                        {song.artist}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Feed
