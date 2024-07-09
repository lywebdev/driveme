import {resolveAlias} from "@helpers/imageHelper.js";
import classes from './VehicleCard.module.scss';

const VehicleCard = () => {
    return <a href='#' className={classes['vehicle-card']}>
        <div className={classes.image}>
            <img src={resolveAlias('@images/vehicles/1.jpg')} alt="scooter"/>
        </div>
        <div className={classes.name}>DriveMe bike, 2020</div>
        <div className={classes.delimiter}></div>
        <div className={classes.price}>from $ 100 / day</div>
    </a>;
};

export default VehicleCard;