import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("CAILON_ACCESS");
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
},
    (error) => {
        console.error(error)
    });

export default api;
