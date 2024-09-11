import { NavLink } from "react-router-dom";
import './Header.scss';
import Button from "@components/UI/Button/Button.jsx";
import Logo from "@components/shared/Logo/Logo.jsx";
import {routes} from "@config/routes.js";
import useAuth from "../../hooks/contexts/useAuth.js";
import {useUserStore} from "@store/useUserStore.js";

const Header = () => {
    const {isAuthenticated} = useAuth();
    const [logout] = useUserStore(state => [
        state.logout
    ]);

    const onLogout = async () => {
        await logout();
    };


    return (
        <header id="header">
            <div className="container">
                <Logo />
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={routes.transports}
                            >
                                Transports
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={routes.dashboard}
                            >
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {
                    isAuthenticated
                        ? <Button onClick={onLogout}>Logout</Button>
                        : <Button url={routes.login}>Login</Button>
                }
            </div>
        </header>
    );
};

export default Header;

