import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Events API
export const getEvents = async () => {
    const response = await api.get('/events');
    return response.data;
};

export const getEventById = async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
};

export const createEvent = async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
};

// Users API
export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const loginUser = async (email, password) => {
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
    }
    return { success: false, message: 'Email ou senha inválidos' };
};

export default api;
