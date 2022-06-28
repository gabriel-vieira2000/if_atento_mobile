import axios from "axios";

const api = axios.create({
    baseURL:'https://04ac-131-72-12-162.sa.ngrok.io',
});

export default api;