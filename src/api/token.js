import axios from "axios"
import { getAPIConfig } from "./config"
import { BASE_URL } from "../common/constant"

export const tokenAPI = {
    save: async (token) => {
        await axios.post(`${BASE_URL}/tokens`, { token: token }, getAPIConfig())
    },
}