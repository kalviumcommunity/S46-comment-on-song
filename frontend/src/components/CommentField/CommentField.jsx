import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { AppContext } from "@/App"
import axios from "@/axios"
import "./CommentField.css"

function CommentField({ threadId, setReloadThread, setLoading }) {
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
            .finally(() => setLoading(false))
    }

    const onSubmit = (value) => {
        setLoading(true)
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
                            minLength: 3,
                            maxLength: 500,
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
