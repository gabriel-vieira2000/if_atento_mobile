import axios from "axios";

const api = axios.create({
    baseURL:'https://3edd-131-72-12-166.sa.ngrok.io',
});

export default api;