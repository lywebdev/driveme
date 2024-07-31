export const routes = {
    home: '/',
    transports: '/transports',
    transport: (id = null) => {
        if (id) {
            return `/transports/${id}`;
        }

        return '/transports/:id';
    },

    dashboard: '/admin',
    exampleAdmin: '/admin/example',
    login: '/login',
    register: '/register',
};