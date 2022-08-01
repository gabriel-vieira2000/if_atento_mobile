import axios from "axios";

const api = axios.create({
    baseURL:'https://0dc4-131-72-12-149.sa.ngrok.io',
});

export default api;