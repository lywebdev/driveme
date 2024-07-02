import './App.scss';
import {RouterProvider} from "react-router-dom";
import {router} from './router.jsx';


const App = () => {
    return (
        <div id="app"><RouterProvider router={router} /></div>
    );
};

export default App;
