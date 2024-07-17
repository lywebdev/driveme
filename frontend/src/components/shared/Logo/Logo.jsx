import {NavLink} from "react-router-dom";
import config from "@config/app.js";
import classes from './Logo.module.scss';
import {routes} from "@config/routes.js";

const Logo = () => {
    return (
        <NavLink to={routes.home} className={classes.logo}>{config.appName}</NavLink>
    );
};

export default Logo;