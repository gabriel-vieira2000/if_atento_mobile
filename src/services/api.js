import axios from "axios";

const api = axios.create({
    baseURL:'https://0473-131-72-13-2.sa.ngrok.io',
});

export default api;