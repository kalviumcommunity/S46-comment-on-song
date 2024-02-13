import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CurrentSongContext } from "@/context/CurrentSongContext"
import "./Song.css"

function Song() {
    const { currentSong } = useContext(CurrentSongContext)
    const { id } = useParams()

    const [songData, setSongData] = useState([])

    const [threadID, setThreadID] = useState("")
    const [threadData, setThreadData] = useState([])

    const [platform, setPlatform] = useState("youtube")

    const detectPlatform = (link) => {
        if (link.includes("spotify.com")) {
            setPlatform("spotify")
        } else if (link.includes("youtube.com")) {
            setPlatform("youtube")
        }
    }

    useEffect(() => {
        if (currentSong.length != 0) {
            detectPlatform(currentSong.link)
            setSongData(currentSong)
            setThreadID(currentSong.commentThreadID)
        }
    }, [id])

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
                            threadData.favoriteComments.map((comment) => (
                                <div className="comment">
                                    <span className="comment-user">
                                        {comment.userID}
                                    </span>
                                    <span className="comment-content">
                                        {comment.commentText}
                                    </span>
                                </div>
                            ))}
                    </div>
                    <div className="comments">
                        <span className="comments-header">
                            General comments
                        </span>
                        {threadData.generalComments &&
                            threadData.generalComments.map((comment) => (
                                <div className="comment">
                                    <span className="comment-user">
                                        {comment.userID}
                                    </span>
                                    <span className="comment-content">
                                        {comment.commentText}
                                    </span>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Song
