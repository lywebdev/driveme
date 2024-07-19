import { NavLink } from "react-router-dom";
import './Header.scss';
import Button from "@components/UI/Button/Button.jsx";
import Logo from "@components/shared/Logo/Logo.jsx";
import {routes} from "@config/routes.js";

const Header = () => {
    console.log('Header');
    const isAuth = true;

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
                    isAuth
                        ? <Button>Logout</Button>
                        : <Button>Login</Button>
                }
            </div>
        </header>
    );
};

export default Header;

