import axios from "axios"
import { getCookie } from "@/helpers/cookies"

const jwtToken = getCookie("token")

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${jwtToken}` },
})

export default instance
