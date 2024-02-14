import React from "react"
import "./Hero.css"
import { Link } from "react-router-dom"

function Hero() {
    return (
        <div className="feed">
            <svg
                className="grain"
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                opacity={0.5}
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect
                    width="100%"
                    height="100%"
                    filter="url(#noiseFilter)"
                ></rect>
            </svg>
            <div className="hero-elements">
                <span className="desc">
                    Share your favourite song and hear what others think
                </span>
                <Link to="/feed">Go to feed</Link>
            </div>
        </div>
    )
}

export default Hero
