import {NavLink} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            Error
            <NavLink to={'/'}>Go home</NavLink>
        </div>
    );
};

export default ErrorPage;