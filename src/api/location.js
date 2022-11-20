import axios from "axios"
import { getAPIConfig } from "./config"
import { BASE_URL } from "../common/constant"

export const locationAPI = {
    save: async (payload) => {
        await axios.post(`${BASE_URL}/locations`, payload, getAPIConfig())
    },
    getNeareast: async () => {
        let response = await axios.get(`${BASE_URL}/locations/nearest`, getAPIConfig())
        return response.data.data
    },
}