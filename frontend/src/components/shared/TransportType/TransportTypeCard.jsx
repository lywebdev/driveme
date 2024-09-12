import classes from './TransportTypeCard.module.scss';
import car from '@images/transport-types/car.jpg';
import bike from '@images/transport-types/bike.jpg';
import bicycle from '@images/transport-types/bicycle.jpg';
import motorbike from '@images/transport-types/motorbike.jpg';
import {NavLink} from "react-router-dom";
import {routes} from "@config/routes.js";

const images = {
    'car.jpg': car,
    'bike.jpg': motorbike,
    'bicycle.jpg': bicycle,
    'scooter.jpg': bike,
};


const TransportTypeCard = ({ transportType }) => {
    let {name, photo} = transportType;
    const imageSrc = images[photo];


    return (
        <div className={classes['transport-type-card']}>
            <NavLink to={`${routes.transports}?type=${transportType.name}`}>
                <div className={classes.image}>
                    <img src={imageSrc} alt={name}/>
                </div>
                <span className={classes.type}>{name}</span>
            </NavLink>
        </div>
    );
};

export default TransportTypeCard;