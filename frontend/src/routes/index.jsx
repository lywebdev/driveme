import {createBrowserRouter} from "react-router-dom";
import Layout from "@layouts/Layout.jsx";
import ErrorPage from "@pages/Errors/ErrorPage.jsx";
import AuthGuard from "../auth/AuthGuard.jsx";
import {adminRoutes, guestRoutes, privateRoutes, publicRoutes} from "./routes.jsx";
import GuestGuard from "../auth/GuestGuard.jsx";
import AdminGuard from "../auth/AdminGuard.jsx";

export const globalRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            ...publicRoutes,
        ],
    },

    {
        element: <GuestGuard />,
        children: [
            ...guestRoutes,
        ],
    },

    {
        element: <AuthGuard />,
        children: [
            ...privateRoutes,
        ],
    },

    {
        element: <AdminGuard />,
        children: [
            ...adminRoutes,
        ],
    },
]);