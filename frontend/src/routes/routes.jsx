import Dashboard from "@pages/admin/Dashboard.jsx";
import HomePage from "@pages/HomePage.jsx";
import {routes} from "@config/routes.js";
import LoginPage from "@pages/Auth/LoginPage.jsx";
import ExampleAdminPage from "@pages/admin/ExampleAdminPage.jsx";
import RegisterPage from "@pages/Auth/RegisterPage.jsx";
import TransportPage from "@pages/TransportPage.jsx";
import TransportsPage from "@pages/TransportsPage.jsx";
import CompletedPage from "@pages/CompletedPage.jsx";
import UserListPage from "@pages/admin/user/UserListPage.jsx";
import OrderListPage from "@pages/admin/order/OrderListPage.jsx";

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
    },
    {
        path: '/completed',
        element: <CompletedPage />,
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
];

export const adminRoutes = [
    {
        path: routes.dashboard,
        element: <Dashboard />,
    },
    {
        path: routes.exampleAdmin,
        element: <ExampleAdminPage />,
    },
    {
        path: '/admin/users',
        element: <UserListPage />,
    },
    {
        path: '/admin/orders',
        element: <OrderListPage />,
    }
];