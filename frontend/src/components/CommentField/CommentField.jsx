import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./CommentField.css"

function CommentField({ threadId, setReloadThread, setLoaderComment }) {
    const { userExists } = useContext(AppContext)
    const { register, handleSubmit, reset } = useForm()

    const handlePostComment = (value) => {
        axios
            .post(`comment/new/${threadId}`, value)
            .then((res) => {
                alert("Your comment posted successfully")
                setReloadThread((prev) => prev + 1)
            })
            .catch((err) => {
                if (err.response) {
                    alert(err.response.data)
                } else alert("Error posting comment. Try again later.")
            })
            .finally(() => setLoaderComment(false))
    }

    const onSubmit = (value) => {
        setLoaderComment(true)
        handlePostComment(value)
        reset()
    }

    return (
        <div className="comment-field-container">
            {userExists ? (
                <form
                    className="comment-field"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        {...register("comment", {
                            required: true,
                            validate: (value) => value.trim().length > 0,
                        })}
                        placeholder="Enter comment (Min 3 and max 500 characters)"
                    />

                    <button type="submit">
                        <img src="/icons/send.svg" alt="" />
                    </button>
                </form>
            ) : (
                <div className="comment-field">
                    <span>
                        <Link to="/login">Login</Link> or&nbsp;
                        <Link to="/signup">Signup</Link> to comment
                    </span>
                </div>
            )}
        </div>
    )
}

export default CommentField
