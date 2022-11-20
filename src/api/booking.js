import axios from "axios"
import { getAPIConfig } from "./config"
import { BASE_URL } from "../common/constant"

export const bookingAPI = {
    create: async (payload) => {
        await axios.post(`${BASE_URL}/bookings`, payload, getAPIConfig())
    },
    accept: async (bookingID) => {
        await axios.post(`${BASE_URL}/bookings/${bookingID}/accept`, getAPIConfig())
    },
    reject: async (bookingID) => {
        await axios.post(`${BASE_URL}/bookings/${bookingID}/reject`, getAPIConfig())
    },
    done: async (bookingID) => {
        await axios.post(`${BASE_URL}/bookings/${bookingID}/done`, getAPIConfig())
    },
    search: async () => {
        const response = await axios.get(`${BASE_URL}/bookings`, getAPIConfig())
        return response.data.data
    },
    get: async (bookingID) => {
        const response = await axios.get(`${BASE_URL}/bookings/${bookingID}`, getAPIConfig())
        return response.data.data
    },
}