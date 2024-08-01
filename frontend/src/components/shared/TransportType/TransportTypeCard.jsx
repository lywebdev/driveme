import classes from './TransportTypeCard.module.scss';
import car from '@images/transport-types/car.jpg';
import bike from '@images/transport-types/bike.jpg';
import bicycle from '@images/transport-types/bicycle.jpg';
import scooter from '@images/transport-types/scooter.jpg';

const images = {
    'car.jpg': car,
    'bike.jpg': bike,
    'bicycle.jpg': bicycle,
    'scooter.jpg': scooter,
};


const TransportTypeCard = ({transportType}) => {
    let {name, photo} = transportType;
    const imageSrc = images[photo];


    return (
        <div className={classes['transport-type-card']}>
            <a href='#'>
                <div className={classes.image}>
                    <img src={imageSrc} alt={name}/>
                </div>
                <span className={classes.type}>{name}</span>
            </a>
        </div>
    );
};

export default TransportTypeCard;