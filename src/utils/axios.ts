import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // default qilib qo‘ysangiz ham bo‘ladi
});

export default axiosInstance;
