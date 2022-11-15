import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com";

const request = (method, path) => {
    return axios({
        method,
        url: `${API_URL}${path}`
    })
}

export default request;