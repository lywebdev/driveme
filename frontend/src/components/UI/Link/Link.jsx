import {NavLink} from "react-router-dom";
import classes from './Link.module.scss';

const Link = ({url, children}) => {
    return <NavLink to={url} className={classes.link}>{children}</NavLink>;
};


export default Link;