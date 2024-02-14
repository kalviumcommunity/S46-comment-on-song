import React from "react"
import "./AddFavSong.css"

function AddFavSong() {
    return (
        <div className="addsong">
            <h2>Add your favourite song</h2>

            <form action="" className="add-form">
                <div className="add-form-element">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter song title"
                    />
                </div>
                <div className="add-form-element">
                    <label htmlFor="link">Link</label>
                    <input
                        type="text"
                        id="link"
                        placeholder="Paste song link from (youtube/spotify)"
                    />
                </div>
                <div className="add-form-element">
                    <label htmlFor="artist">Artist</label>
                    <input
                        type="text"
                        id="artist"
                        placeholder="Enter artist name"
                    />
                </div>
                <div className="add-form-element">
                    <button type="submit">Add the song</button>
                </div>
            </form>
        </div>
    )
}

export default AddFavSong
