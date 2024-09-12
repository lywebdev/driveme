import OfferCard from "@components/shared/OfferCard/OfferCard.jsx";
import classes from './PopularRentTopics.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";

import FirstPopularRentTopic from '@public/images/popular-rent-topics/1.jpg';
import SecondPopularRentTopic from '@public/images/popular-rent-topics/2.jpg';
import ThirdPopularRentTopic from '@public/images/popular-rent-topics/3.jpg';


const popularRentTopicsData = [
    {
        id: 1,
        name: 'A trip around the city',
        photo: FirstPopularRentTopic,
        price: 100,
    },
    {
        id: 2,
        name: 'A car with a roof rack',
        photo: SecondPopularRentTopic,
        price: 150,
    },
    {
        id: 3,
        name: 'A car for off-road trips',
        photo: ThirdPopularRentTopic,
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