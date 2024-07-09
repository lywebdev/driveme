import VehicleTypeCard from "@components/shared/VehicleType/VehicleTypeCard.jsx";
import classes from './VehicleTypeCards.module.scss';
import {resolveAlias} from "@helpers/imageHelper.js";
import {combineClassNames} from "@helpers/stringHelper.js";

const vehicleTypesData = [
    {
        id: 1,
        name: 'Bikes',
        photo: resolveAlias('@images/vehicle-types/bikes.jpg'),
    },
    {
        id: 2,
        name: 'Cars',
        photo: resolveAlias('@images/vehicle-types/cars.jpg'),
    },
    {
        id: 3,
        name: 'Bicycles',
        photo: resolveAlias('@images/vehicle-types/bicycles.jpg'),
    },
    {
        id: 4,
        name: 'Scooters',
        photo: resolveAlias('@images/vehicle-types/scooters.jpg'),
    },
];


const VehicleTypeCards = ({className}) => {
    const combinedClasses = combineClassNames(classes['vehicle-type-cards'], className);

    return (
        <div className={combinedClasses}>
            {vehicleTypesData.map(vehicleType => <VehicleTypeCard key={vehicleType.id} vehicleType={vehicleType}/>)}
        </div>
    );
};


export default VehicleTypeCards;