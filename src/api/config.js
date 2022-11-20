import { LOGIN_PAGE } from "../common/constant"

export const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
}

export const getAPIConfig = () => {
    if (localStorage.getItem("token")) {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    }

    window.location.href = LOGIN_PAGE
}
