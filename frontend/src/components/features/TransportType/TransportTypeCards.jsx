import TransportTypeCard from "@components/shared/TransportType/TransportTypeCard.jsx";
import {resolveAlias} from "@helpers/imageHelper.js";
import classes from './TransportTypeCards.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";

const transportTypesData = [
    {
        id: 1,
        name: 'Bikes',
        photo: resolveAlias('@images/transport-types/bikes.jpg'),
    },
    {
        id: 2,
        name: 'Cars',
        photo: resolveAlias('@images/transport-types/cars.jpg'),
    },
    {
        id: 3,
        name: 'Bicycles',
        photo: resolveAlias('@images/transport-types/bicycles.jpg'),
    },
    {
        id: 4,
        name: 'Scooters',
        photo: resolveAlias('@images/transport-types/scooters.jpg'),
    },
];


const TransportTypeCards = ({className}) => {
    const combinedClasses = combineClassNames(classes['transport-type-cards'], className);

    return (
        <div className={combinedClasses}>
            {transportTypesData.map(transportType => <TransportTypeCard key={transportType.id} transportType={transportType}/>)}
        </div>
    );
};


export default TransportTypeCards;