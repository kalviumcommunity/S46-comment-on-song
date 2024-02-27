import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "@/components/Loader"
import CommentField from "@/components/CommentField"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./Song.css"

function Song() {
    const { id } = useParams()
    const { currentSong } = useContext(AppContext)

    const [songData, setSongData] = useState([])
    const [threadId, setThreadId] = useState("")
    const [threadData, setThreadData] = useState([])
    const [reloadThread, setReloadThread] = useState(0)
    const [platform, setPlatform] = useState("youtube")
    const [loaderComment, setLoaderComment] = useState(false)

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
    }, [threadId, reloadThread])

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
                            Admiration for this song 😍
                        </span>
                        {threadData.favoriteComments ? (
                            threadData.favoriteComments.length != 0 ? (
                                threadData.favoriteComments
                                    .slice()
                                    .reverse()
                                    .map((comment, index) => (
                                        <div className="comment" key={index}>
                                            <span className="comment-user">
                                                {comment.createdBy}
                                            </span>
                                            <span className="comment-content">
                                                {comment.commentText}
                                            </span>
                                        </div>
                                    ))
                            ) : (
                                threadData.favoriteComments.length ==
                                0(
                                    <span className="comment-empty">
                                        No comments yet.
                                    </span>,
                                )
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <div className="comments">
                        <span className="comments-header">
                            General comments
                        </span>
                        {threadData.generalComments ? (
                            threadData.generalComments != 0 ? (
                                threadData.generalComments
                                    .slice()
                                    .reverse()
                                    .map((comment, index) => (
                                        <div className="comment" key={index}>
                                            <span className="comment-user">
                                                {comment.createdBy}
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
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>
                </>
            )}
            {loaderComment && (
                <div className="comment-loader">
                    <Loader />
                </div>
            )}
            <CommentField
                threadId={threadId}
                setReloadThread={setReloadThread}
                setLoaderComment={setLoaderComment}
            />
        </div>
    )
}

export default Song
