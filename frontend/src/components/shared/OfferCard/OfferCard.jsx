import Button from "@components/UI/Button/Button.jsx";
import classes from './OfferCard.module.scss';

const OfferCard = ({data}) => {
    return <div className={classes['offer-card']}>
        <a href='#' className={classes.image}>
            <img src={data.photo} alt={data.name}/>
        </a>
        <a href='#' className={classes.name}>{data.name}</a>
        <div className={classes['price-section']}>
            <span className={classes['price-text']}>Cost from:</span>
            <span className={classes.price}>
                <span className={classes.left}>$ {data.price}</span>
                <span className={classes.delimiter}>/</span>
                <span className={classes.right}>per day</span>
            </span>
        </div>
        <Button className={classes.btn} variants={[Button.variants.grayLighter, Button.variants.rounded]}>Offers</Button>
    </div>;
};

export default OfferCard;