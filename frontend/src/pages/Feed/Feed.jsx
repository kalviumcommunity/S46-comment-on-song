import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "@/axios"
import "./Feed.css"
import { AppContext } from "@/App"

function Feed() {
    const { setCurrentSong } = useContext(AppContext)

    const [songs, setSongs] = useState([])

    const updateCurrentSong = (song) => {
        setCurrentSong(song)
    }

    useEffect(() => {
        axios
            .get("/feed")
            .then((res) => setSongs(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="feed">
            <div className="feed-container">
                <h1 className="feed-header">
                    Discover <i>comments</i> on song
                </h1>
                {songs && (
                    <>
                        {songs.map((song, index) => (
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
