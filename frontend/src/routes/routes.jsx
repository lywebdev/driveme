import Dashboard from "@pages/admin/Dashboard.jsx";
import HomePage from "@pages/HomePage.jsx";
import {routes} from "@config/routes.js";
import LoginPage from "@pages/Auth/LoginPage.jsx";
import ExampleAdminPage from "@pages/admin/ExampleAdminPage.jsx";
import RegisterPage from "@pages/Auth/RegisterPage.jsx";
import TransportPage from "@pages/TransportPage.jsx";
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
    {
        path: routes.transport(),
        element: <TransportPage />,
    }
];

export const guestRoutes = [
    {
        path: routes.login,
        element: <LoginPage />,
    },
    {
        path: routes.register,
        element: <RegisterPage />,
    }
];

export const privateRoutes = [
    {
        path: routes.dashboard,
        element: <Dashboard />,
    },
    {
        path: routes.exampleAdmin,
        element: <ExampleAdminPage />,
    }
    // {
    //     path: '/logout',
    //     component: '',
    // }
];