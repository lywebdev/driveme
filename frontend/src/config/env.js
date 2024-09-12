export default {
    backendUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    frontendUrl: import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
};