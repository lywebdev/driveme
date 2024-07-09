import VehicleCard from "@components/shared/Vehicle/VehicleCard.jsx";
import classes from './RecentOffers.module.scss';

const RecentOffers = ({title, marginTop}) => {
    const combinedClasses = `${classes['recent-offers']} ${marginTop ? classes.marginTop : ''}`.trim();

    return <>
        {title}
        <div className={combinedClasses}>
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
        </div>
    </>;
};

export default RecentOffers;