import axios from "axios";


const API_BASE_URL = 'https://pastebin-api-production.up.railway.app/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const healthCheck = async () => {
    const response = await api.get('/healthz');
    return response.data
}

export const createPaste = async (data) => {
    const response = await api.post('/pastes', data);
    return response.data
}

export const fetchPaste = async (id) => {
    const response = await api.get(`/pastes/${id}`);
    console.log("Response:-", response.data);
    return response.data
}

export default api;