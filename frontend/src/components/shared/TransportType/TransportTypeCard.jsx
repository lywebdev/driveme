import classes from './TransportTypeCard.module.scss';

const TransportTypeCard = ({transportType}) => {
    let {name, photo} = transportType;

    return (
        <div className={classes['transport-type-card']}>
            <a href='#'>
                <div className={classes.image}>
                    <img src={photo} alt={name}/>
                </div>
                <span className={classes.type}>{name}</span>
            </a>
        </div>
    );
};

export default TransportTypeCard;