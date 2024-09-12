import React from "react";
import classes from './RecentOffers.module.scss';
import TransportCard from "@components/shared/Transport/TransportCard.jsx";

const RecentOffers = ({ title, marginTop, recentOffers }) => {
    const combinedClasses = `${classes['recent-offers']} ${marginTop ? classes.marginTop : ''}`.trim();
    let trimmedArray = [];
    if (recentOffers) {
        trimmedArray = recentOffers.slice(0, 4);
    }


    return <>
        {title}
        <div className={combinedClasses}>
            {
                trimmedArray.map((recentOffer, index) => {
                    return <React.Fragment key={index}>
                        <TransportCard transport={recentOffer} />
                    </React.Fragment>;
                })
            }
        </div>
    </>;
};

export default RecentOffers;