import './App.scss';
import {RouterProvider} from "react-router-dom";
import {globalRouter} from "../routes/index.jsx";
import AuthContextProvider from "../auth/auth.context.jsx";


const App = () => {
    return (
        <>
            <AuthContextProvider>
                <RouterProvider router={globalRouter} />
            </AuthContextProvider>
        </>
    );
};

export default App;
