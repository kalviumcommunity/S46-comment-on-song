import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./AddFavSong.css"

function AddFavSong({ page }) {
    const { userObj } = useContext(AppContext)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleAddFavSong = (values, userId) => {
        const songData = { ...values, userId: userId }
        axios
            .post("/favsong/create", songData)
            .then((res) => {
                setSubmitStatus({
                    status: "success",
                    response: res,
                })
            })
            .catch((err) => {
                setSubmitStatus({ status: "error", error: err })
                console.log(err)
                alert(err.response.data.error)
            })
            .finally(() => setIsLoading(false))
    }

    const handleEditFavSong = (values, songId, userId) => {
        const songData = { ...values, userId }
        axios
            .patch(`/favsong/edit/${songId}`, songData)
            .then((res) => {
                setSubmitStatus({
                    status: "success",
                    response: res,
                })
            })
            .catch((err) => {
                setSubmitStatus({ status: "error", error: err })
                alert(err.response.data.error)
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    const onSubmit = (values) => {
        setIsLoading(true)

        if (page === "Add") handleAddFavSong(values, userObj._id)
        else if (page === "Edit")
            handleEditFavSong(values, userObj.favoriteSong, userObj._id)

        setIsSubmitted(true)
    }

    return (
        <div className="addsong">
            <div className="addsong-container">
                {!isSubmitted ? (
                    <>
                        <h2>{page} your favourite song now!</h2>
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
                                <button type="submit">{page} the song</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="add-form">
                        {submitStatus && submitStatus.status === "success" && (
                            <>
                                <span className="add-form-status">
                                    {page === "Add"
                                        ? "Song added successfully ✅"
                                        : page === "Edit"
                                          ? "Song edited successfully ✅"
                                          : null}
                                </span>
                                <Link to="/feed" className="add-form-action">
                                    <button>Go to feed</button>
                                </Link>
                            </>
                        )}
                        {submitStatus && submitStatus.status === "error" && (
                            <>
                                <span className="add-form-status">
                                    {page === "Add"
                                        ? "❌ Error adding the song. "
                                        : page === "Edit"
                                          ? "❌ Error editing the song. "
                                          : null}
                                    Please try again.
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
                {isLoading && (
                    <div className="add-form-loader">
                        <span className="add-form-status">Submiting...⌛</span>
                        <span className="add-form-status">Please wait</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddFavSong
