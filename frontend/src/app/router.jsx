import {createBrowserRouter} from "react-router-dom";
import Layout from "@layouts/Layout.jsx";
import ErrorPage from "@pages/Errors/ErrorPage.jsx";
import HomePage from "@pages/HomePage.jsx";
import ExampleTransportsPage from "@pages/ExampleTransportsPage.jsx";
import routes from '@config/routes.js';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: routes.exampleTransportsPage,
                element: <ExampleTransportsPage />,
            }
        ]
    }
]);