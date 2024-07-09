import classes from './VehicleTypeCard.module.scss';

const VehicleTypeCard = ({vehicleType}) => {
    let {name, photo} = vehicleType;

    return (
        <div className={classes['vehicle-type-card']}>
            <a href='#'>
                <div className={classes.image}>
                    <img src={photo} alt={name}/>
                </div>
                <span className={classes.type}>{name}</span>
            </a>
        </div>
    );
};

export default VehicleTypeCard;