import OfferCard from "@components/shared/OfferCard/OfferCard.jsx";
import classes from './PopularRentTopics.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";
import {resolveAlias} from "@helpers/imageHelper.js";

const popularRentTopicsData = [
    {
        id: 1,
        name: 'A trip around the city',
        photo: resolveAlias('@images/popular-rent-topics/1.jpg'),
        price: 100,
    },
    {
        id: 2,
        name: 'A car with a roof rack',
        photo: resolveAlias('@images/popular-rent-topics/2.jpg'),
        price: 150,
    },
    {
        id: 3,
        name: 'A car for off-road trips',
        photo: resolveAlias('@images/popular-rent-topics/3.jpg'),
        price: 200,
    },
];


const PopularRentTopics = ({title, className, marginTop}) => {
    const combinedClasses = combineClassNames([classes['popular-rent-topics'], marginTop && classes.marginTop, className]);

    return <>
        {title}
        <div className={combinedClasses}>
            {popularRentTopicsData.map(popularRentTopic => <OfferCard key={popularRentTopic.id} data={popularRentTopic} />)}
        </div>
    </>;
};

export default PopularRentTopics;