import axios from "axios"
import { getAPIConfig } from "./config"
import { BASE_URL } from "../common/constant"

export const notificationAPI = {
    search: async (params = {}) => {
        let q = []
        for (const key in params) {
            q.push(`${key}=${params[key]}`)
        }
        let queries = q.join('&')

        const response = await axios.get((q.length === 0) ? `${BASE_URL}/notifications` : `${BASE_URL}/notifications&${queries}`, getAPIConfig())
        return response.data.data
    },
    seen: async (notificationID) => {
        await axios.put(`${BASE_URL}/notifications/${notificationID}/seen`, null, getAPIConfig())
    },
}