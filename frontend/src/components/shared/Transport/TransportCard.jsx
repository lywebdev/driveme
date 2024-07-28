import {resolveAlias} from "@helpers/imageHelper.js";
import classes from './TransportCard.module.scss';
import SkeletonImage from "@components/shared/Image/SkeletonImage.jsx";

const TransportCard = ({transport}) => {
    let imgSrc = resolveAlias('@images/transports/bike.jpg');
    if (transport?.photos) {
        imgSrc = transport.photos[0];
    }


    return <a href='#' className={classes['transport-card']}>
        <SkeletonImage className={classes.image} src={imgSrc} />
        <div className={classes.name}>{transport?.name}</div>
        <div className={classes.delimiter}></div>
        <div className={classes.price}>from $ {transport?.cost} / day</div>
    </a>;
};

export default TransportCard;
