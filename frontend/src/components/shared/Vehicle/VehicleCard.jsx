import {resolveAlias} from "@helpers/imageHelper.js";
import classes from './VehicleCard.module.scss';

const VehicleCard = (props) => {
    return <a href='#' className={classes['vehicle-card']}>
        <div className={classes.image}>
            <img src={resolveAlias('@images/vehicles/bike.jpg')} alt="scooter"/>
        </div>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.delimiter}></div>
        <div className={classes.price}>{props.price} $ / day</div>
        <div className={classes.delimiter}></div>
        <div className={classes.rating}>{props.rating}</div>
        <div className={classes.location}>{props.location}</div>
        <div className={classes.delimiter}></div>
        <div className={classes.delivery}>{props.delivery ? 'Delivery available' : ''}</div>
    </a>;
};

export default VehicleCard;
