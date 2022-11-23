import axios from "axios"
import { getAPIConfig } from "./config"
import { BASE_URL } from "../common/constant"

export const accountAPI = {
    create: async (payload) => {
        await axios.post(`${BASE_URL}/accounts`, payload)
    },
    update: async (payload) => {
        await axios.put(`${BASE_URL}/accounts`, payload, getAPIConfig())
    },
    login: async (payload) => {
        let response = await axios.post(`${BASE_URL}/accounts/login`, payload)
        return response.data.data
    },
    getOwn: async () => {
        let response = await axios.get(`${BASE_URL}/accounts/me`, getAPIConfig())
        return response.data.data
    }
}
