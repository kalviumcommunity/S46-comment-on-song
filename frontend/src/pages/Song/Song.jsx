import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CurrentSongContext } from "@/context/CurrentSongContext"
import axios from "@/axios"
import "./Song.css"

function Song() {
    const { id } = useParams()
    const { currentSong } = useContext(CurrentSongContext)

    const [songData, setSongData] = useState([])
    const [threadId, setThreadId] = useState("")
    const [threadData, setThreadData] = useState([])

    const [platform, setPlatform] = useState("youtube")

    const updatePlatformState = (link) => {
        if (link.includes("spotify.com")) {
            setPlatform("spotify")
        } else if (link.includes("youtube.com")) {
            setPlatform("youtube")
        }
    }

    const updateState = (data) => {
        updatePlatformState(data.link)
        setSongData(data)
        setThreadId(data.commentThreadId)
    }

    useEffect(() => {
        if (currentSong.length != 0) {
            updateState(currentSong)
        } else {
            axios
                .get(`/song/${id}`)
                .then((res) => updateState(res.data))
                .catch((err) => console.log(err))
        }
    }, [id, currentSong])

    useEffect(() => {
        if (threadId) {
            axios
                .get(`/thread/${threadId}`)
                .then((res) => setThreadData(res.data))
                .catch((err) => console.log(err))
        }
    }, [threadId])

    return (
        <div className="fav-container">
            <div className="fav-song">
                <img className="fav-art" src={songData.artLink} alt="" />
                <div className="fav-details">
                    <span className="fav-title">{songData.title}</span>
                    <span className="fav-artist">{songData.artist}</span>
                    {platform === "youtube" ? (
                        <a
                            className="fav-play fav-play-youtube"
                            href={songData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Play it on
                            <img src="/icons/youtube.svg" alt="" />
                        </a>
                    ) : (
                        <a
                            className="fav-play fav-play-spotify"
                            href={songData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Play it on
                            <img src="/icons/spotify.svg" alt="" />
                        </a>
                    )}
                </div>
            </div>
            {threadData && (
                <>
                    <div className="comments">
                        <span className="comments-header">
                            Admiration for this song
                        </span>
                        {threadData.favoriteComments &&
                        threadData.favoriteComments.length != 0 ? (
                            threadData.favoriteComments.map(
                                (comment, index) => (
                                    <div className="comment" key={index}>
                                        <span className="comment-user">
                                            user-{comment.userId.slice(-4)}
                                        </span>
                                        <span className="comment-content">
                                            {comment.commentText}
                                        </span>
                                    </div>
                                ),
                            )
                        ) : (
                            <span className="comment-empty">
                                No comments yet.
                            </span>
                        )}
                    </div>
                    <div className="comments">
                        <span className="comments-header">
                            General comments
                        </span>
                        {threadData.generalComments &&
                        threadData.generalComments != 0 ? (
                            threadData.generalComments.map((comment, index) => (
                                <div className="comment" key={index}>
                                    <span className="comment-user">
                                        {comment.userId}
                                    </span>
                                    <span className="comment-content">
                                        {comment.commentText}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span className="comment-empty">
                                No comments yet.
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Song
