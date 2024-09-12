import classes from './TransportCard.module.scss';
import SkeletonImage from "@components/shared/Image/SkeletonImage.jsx";
import {NavLink} from "react-router-dom";
import {routes} from "@config/routes.js";
import bike from '@images/transports/bike.jpg';

const TransportCard = ({ transport }) => {
    let imgSrc = bike;
    if (transport?.photos) {
        imgSrc = transport.photos[0];
    }


    return <NavLink to={routes.transport(transport?.id)} className={classes['transport-card']}>
        <SkeletonImage className={classes.image} src={imgSrc} />
        <div className={classes.name}>{transport?.name}</div>
        <div className={classes.delimiter}></div>
        <div className={classes.price}>from $ {transport?.cost} / day</div>
    </NavLink>;
};

export default TransportCard;
