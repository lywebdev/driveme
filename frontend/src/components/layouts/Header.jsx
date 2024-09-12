import { NavLink } from "react-router-dom";
import './Header.scss';
import Button from "@components/UI/Button/Button.jsx";
import Logo from "@components/shared/Logo/Logo.jsx";
import {routes} from "@config/routes.js";
import useAuth from "../../hooks/contexts/useAuth.js";
import {useUserStore} from "@store/useUserStore.js";
import {USER_ROLES} from "../../../utils/constants.js";

const Header = () => {
    const { isAuthenticated, user } = useAuth();
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
                        {
                            isAuthenticated && user.role === USER_ROLES.admin
                                ? (
                                    <li>
                                        <NavLink
                                            to={routes.dashboard}
                                        >
                                            Admin
                                        </NavLink>
                                    </li>
                                )
                                : null
                        }
                    </ul>
                </nav>
                {
                    isAuthenticated
                        ? <>
                            <span style={{marginRight: '20px'}}>{user.name}</span>
                            <Button onClick={onLogout}>Logout</Button>
                        </>
                        : <Button url={routes.login}>Login</Button>
                }
            </div>
        </header>
    );
};

export default Header;

