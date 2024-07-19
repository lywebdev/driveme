import Dashboard from "@pages/admin/Dashboard.jsx";
import HomePage from "@pages/HomePage.jsx";
import {routes} from "@config/routes.js";
import Login from "@pages/Auth/Login.jsx";
import TransportsPage from "@pages/TransportsPage.jsx";

export const publicRoutes = [
    {
        index: true,
        element: <HomePage />,
    },
    {
        path: routes.transports,
        element: <TransportsPage />,
    },
];

export const guestRoutes = [
    {
        path: routes.login,
        element: <Login />,
    }
];

export const privateRoutes = [
    {
        path: routes.dashboard,
        element: <Dashboard />,
    },
    // {
    //     path: '/logout',
    //     component: '',
    // }
];