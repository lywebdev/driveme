import Dashboard from "@pages/admin/Dashboard.jsx";
import ExampleTransportsPage from "@pages/ExampleTransportsPage.jsx";
import HomePage from "@pages/HomePage.jsx";
import {routes} from "@config/routes.js";
import Login from "@pages/Auth/Login.jsx";

export const publicRoutes = [
    {
        index: true,
        element: <HomePage />,
    },
    {
        path: routes.exampleTransportPage,
        element: <ExampleTransportsPage />,
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