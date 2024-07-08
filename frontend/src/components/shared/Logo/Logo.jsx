import {NavLink} from "react-router-dom";
import routes from "@config/routes.js";
import config from "@config/app.js";
import classes from './Logo.module.scss';

const Logo = () => {
    return (
        <NavLink to={routes.home} className={classes.logo}>{config.appName}</NavLink>
    );
};

export default Logo;