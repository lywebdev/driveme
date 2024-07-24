import {NavLink} from "react-router-dom";
import classes from './Link.module.scss';

const Link = ({to, children}) => {
    return <NavLink to={to} className={classes.link}>{children}</NavLink>;
};


export default Link;