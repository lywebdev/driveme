import { NavLink } from "react-router-dom";
import routes from "@config/routes.js";

const Header = () => {
    const isAuth = true;

    return (
        <header id="header">
            <div className="container">
                <div className="logo">DriveMe</div> {/* TODO: MAKE IT A LINK TO HOMEPAGE ONCE WE HAVE IT */}
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
                {isAuth ? <button className="auth-button">Logout</button> : <button className="auth-button">Login</button>}
            </div>
        </header>
    );
};

export default Header;

