class TransportDTO {
    id;
    cost;
    description;
    hasDelivery;
    name;
    photos;

    owner;
    locationData;
    transportType;


    constructor({
        id,
        cost,
        description,
        hasDelivery,
        name,
        photos,
        owner,
        transportType,
        locationData,
    }) {
        this.id = id;
        this.cost = cost;
        this.description = description;
        this.hasDelivery = hasDelivery;
        this.name = name;
        this.photos = photos;

        this.owner = owner;
        this.transportType = transportType;
        this.locationData = locationData;
    }
}

export default TransportDTO;