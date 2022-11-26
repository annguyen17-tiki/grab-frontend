import axios from "axios"
import { GEOAPIFY_API_KEY, GEOAPIFY_BASE_URL } from "../common/constant"

export const geoAPI = {
    autocomplete: async (text) => {
        let uri = `${GEOAPIFY_BASE_URL}/v1/geocode/autocomplete?apiKey=${GEOAPIFY_API_KEY}&text=${text}`
        const response = await axios.get(encodeURI(uri))

        let result = []
        for (let item of response.data.features) {
            result.push({
                value: item.properties.formatted,
                latitude: item.properties.lat,
                longitude: item.properties.lon,
            })
        }

        return result
    }
}