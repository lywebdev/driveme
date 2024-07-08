import { NavLink } from "react-router-dom";
import routes from "@config/routes.js";
import './Header.scss';
import Button from "@components/UI/Button/Button.jsx";
import Logo from "@components/shared/Logo/Logo.jsx";

const Header = () => {
    const isAuth = true;

    return (
        <header id="header">
            <div className="container">
                <Logo />
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={routes.exampleTransportsPage}
                                className={({ isActive }) => (isActive ? "active" : "inactive")}
                            >
                                ExampleTransportsPage
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

