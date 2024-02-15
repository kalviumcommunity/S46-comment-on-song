import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import "./AddFavSong.css"
import axios from "@/axios"

function AddFavSong() {
    const [submission, setSubmission] = useState(false)
    const [preview, setPreview] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState(null)
    const [userId, setUserId] = useState("user002")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (values) => {
        setSubmission(true)
        console.log(values)
        const payload = { ...value, userId: userId }
        axios
            .post("/favsong/create", payload)
            .then((res) => {
                console.log(res)
                setSubmissionStatus(res)
            })
            .catch((err) => setSubmission(err))
        setSubmission(true)
    }

    return (
        <div className="addsong">
            <div className="addsong-container">
                {!submission ? (
                    <>
                        <h2>Add your favourite song now!</h2>
                        <form
                            className="add-form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="add-form-element">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter song title"
                                    {...register("title", {
                                        required: "Title of song is required!",
                                    })}
                                />
                                {errors.title && (
                                    <p className="add-form-err">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                            <div className="add-form-element">
                                <label htmlFor="link">Link</label>
                                <input
                                    type="text"
                                    placeholder="Paste song link from (youtube/spotify)"
                                    {...register("link", {
                                        required: "Link is required!",
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[A-Za-z0-9_-]+|music\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+|youtu\.be\/[A-Za-z0-9_-]+|open\.spotify\.com\/track\/[A-Za-z0-9_-]+)/,
                                            message:
                                                "Please enter a valid YouTube or Spotify link.",
                                        },
                                    })}
                                />
                                {errors.link && (
                                    <p className="add-form-err">
                                        {errors.link.message}
                                    </p>
                                )}
                            </div>
                            <div className="add-form-element">
                                <label htmlFor="artist">Artist</label>
                                <input
                                    type="text"
                                    placeholder="Enter artist name"
                                    {...register("artist", {
                                        required: "Artist name is required!",
                                    })}
                                />
                                {errors.artist && (
                                    <p className="add-form-err">
                                        {errors.artist.message}
                                    </p>
                                )}
                            </div>
                            <div className="add-form-element">
                                <label htmlFor="artist">
                                    Your comment (Share about why you love this
                                    track)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your comment 🤔💭"
                                    {...register("comment", {
                                        required: "Comment is required!",
                                    })}
                                />
                                {errors.comment && (
                                    <p className="add-form-err">
                                        {errors.comment.message}
                                    </p>
                                )}
                            </div>
                            <div className="add-form-element">
                                <button type="submit">Add the song</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="add-form">
                        {submissionStatus && submissionStatus.status === 201 ? (
                            <>
                                <span className="add-form-status">
                                    Song added successfully ✅
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="add-form-status">
                                    ❌ Error adding the song. Please try again.
                                </span>
                                <button
                                    className="add-form-reload"
                                    onClick={() => location.reload()}
                                >
                                    Refresh and try again
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddFavSong
