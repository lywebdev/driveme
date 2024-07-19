import classes from './TransportTypeCard.module.scss';
import {resolveAlias} from "@helpers/imageHelper.js";

const TransportTypeCard = ({transportType}) => {
    let {name, photo} = transportType;

    return (
        <div className={classes['transport-type-card']}>
            <a href='#'>
                <div className={classes.image}>
                    <img src={resolveAlias(`@images/transport-types/${photo}`)} alt={name}/>
                </div>
                <span className={classes.type}>{name}</span>
            </a>
        </div>
    );
};

export default TransportTypeCard;