import axios from "axios"
import { getAPIConfig } from "./config"
import { BASE_URL } from "../common/constant"

export const notificationAPI = {
    search: async () => {
        const response = await axios.get(`${BASE_URL}/notifications`, getAPIConfig())
        return response.data.data
    },
    done: async (notificationID) => {
        await axios.post(`${BASE_URL}/notifications/${notificationID}/seen`, getAPIConfig())
    },
}