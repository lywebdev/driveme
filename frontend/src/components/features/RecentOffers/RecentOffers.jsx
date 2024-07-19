import classes from './RecentOffers.module.scss';
import TransportCard from "@components/shared/Transport/TransportCard.jsx";

const RecentOffers = ({title, marginTop}) => {
    const combinedClasses = `${classes['recent-offers']} ${marginTop ? classes.marginTop : ''}`.trim();

    return <>
        {title}
        <div className={combinedClasses}>
            <TransportCard />
            <TransportCard />
            <TransportCard />
            <TransportCard />
        </div>
    </>;
};

export default RecentOffers;