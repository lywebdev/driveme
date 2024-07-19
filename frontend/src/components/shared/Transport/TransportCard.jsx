import {resolveAlias} from "@helpers/imageHelper.js";
import classes from './TransportCard.module.scss';

const TransportCard = ({transport}) => {
    return <a href='#' className={classes['transport-card']}>
        <div className={classes.image}>
            <img src={resolveAlias('@images/transports/bike.jpg')} alt="scooter"/>
        </div>
        <div className={classes.name}>{transport?.name}</div>
        <div className={classes.delimiter}></div>
        <div className={classes.price}>from $ {transport?.cost} / day</div>
    </a>;
};

export default TransportCard;
