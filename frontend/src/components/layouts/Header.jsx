import {NavLink} from "react-router-dom";
import routes from "@config/routes.js";

const Header = () => {
    const isAuth = true;

    return (
        <header id="header">
            Header
            <nav>
                <ul><li><NavLink to={routes.exampleTransportsPage} className={({isActive}) =>
                    isActive ? 'active' : ''
                }>ExampleTransportsPage</NavLink></li></ul>
            </nav>

            {
                isAuth && (
                    <div>Logout</div>
                )
            }
        </header>
    );
};

export default Header;