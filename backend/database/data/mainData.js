import transportBikes from './transports/transportBikes.json' with { type: "json" };
import transportBikesLocations from './locations/transportBikesLocationData.json' with { type: "json" };

import transportCars from './transports/transportCars.json' with { type: "json" };
import transportCarsLocations from './locations/transportCarsLocationData.json' with { type: "json" };

import transportBicycles from './transports/transportBicycles.json' with { type: "json" };
import transportBicyclesLocations from './locations/transportBicyclesLocationData.json' with { type: "json" };

import transportScooters from './transports/transportScooters.json' with { type: "json" };
import transportScootersLocations from './locations/transportScootersLocationData.json' with { type: "json" };



const mainData = {
    transports: [
        ...transportCars,
        ...transportBikes,
        ...transportBicycles,
        ...transportScooters,
    ],
    locations: [
        ...transportCarsLocations,
        ...transportBikesLocations,
        ...transportBicyclesLocations,
        ...transportScootersLocations,
    ],
}


export default mainData;