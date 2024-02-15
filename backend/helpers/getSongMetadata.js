const urlMetadata = require("url-metadata")

function extractIdFromSpotifyLink(link) {
    const match = link.match(/open\.spotify\.com\/track\/(\w+)/)
    return match ? match[1] : null
}

function extractIdFromYoutubeLink(link) {
    const match = link.match(/(?:\?v=|\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : null
}

function checkUrlValidity(link) {
    let id
    if (link.includes("open.spotify.com")) {
        id = extractIdFromSpotifyLink(link)
    } else if (link.includes("youtube.com") || link.includes("youtu.be")) {
        id = extractIdFromYoutubeLink(link)
    } else {
        return false
    }

    if (!id) {
        return false
    }

    const isValidSpotifyId = /^[A-Za-z0-9_-]{22}$/.test(id)
    const isValidYoutubeId = /^[a-zA-Z0-9_-]{11}$/.test(id)

    return isValidSpotifyId || isValidYoutubeId
}

function sanitizeSpotifyLink(link) {
    return link.split("?")[0]
}

function sanitizeYoutubeLink(link) {
    const videoId = link.split("v=")[1].split("&")[0]
    return `https://youtube.com/watch?v=${videoId}`
}

function sanitizeLink(link) {
    if (link.includes("spotify.com")) {
        return sanitizeSpotifyLink(link)
    } else if (link.includes("youtube.com")) {
        return sanitizeYoutubeLink(link)
    } else {
        return link
    }
}

async function getSongMetadata(songLink) {
    try {
        const sanitizedLink = sanitizeLink(songLink)

        if (checkUrlValidity(sanitizedLink)) {
            const metadata = await urlMetadata(sanitizedLink)

            const ogLink = metadata["url"]
            const ogImage = metadata["og:image"]

            const songMetadata = {
                link: ogLink,
                artLink: ogImage,
            }

            return songMetadata
        } else {
            return {
                error: 400,
                message: "Please enter a valid YouTube or Spotify link",
            }
        }
    } catch (err) {
        console.error(err)
        return {
            error: 500,
            message: "Internal server error",
        }
    }
}

module.exports = getSongMetadata
