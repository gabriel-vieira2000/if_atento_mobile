import axios from "axios";
//import { API_BASE_URL } from 'react-native-dotenv';
import { secretVar } from "../secretVar";

const api = axios.create({
    baseURL: secretVar.API_BASE_URL,
});

export default api;