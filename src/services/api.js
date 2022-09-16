import axios from "axios";

const api = axios.create({
    baseURL:'https://dark-pink-puffer-hat.cyclic.app',
});

export default api;