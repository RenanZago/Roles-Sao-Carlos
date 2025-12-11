import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export const geocodeAddress = async (address) => {
    try {
        const encodedAddress = encodeURIComponent(address + ', São Carlos, SP, Brasil');
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
            {
                headers: {
                    'User-Agent': 'RoleSC-App/1.0'
                }
            }
        );
        const data = await response.json();

        if (data && data.length > 0) {
            return {
                success: true,
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
                displayName: data[0].display_name
            };
        }
        return { success: false, message: 'Endereço não encontrado' };
    } catch (error) {
        console.error('Erro ao geocodificar:', error);
        return { success: false, message: 'Erro ao buscar coordenadas' };
    }
};

export default api;
