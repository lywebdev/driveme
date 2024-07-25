class TransportDTO {
    id;
    cost;
    description;
    hasDelivery;
    name;
    ownerId;
    photos;

    locationData;
    transportType;


    constructor({
        id,
        cost,
        description,
        hasDelivery,
        name,
        ownerId,
        photos,
        transportType,
        locationData,
    }) {
        this.id = id;
        this.cost = cost;
        this.description = description;
        this.hasDelivery = hasDelivery;
        this.name = name;
        this.ownerId = ownerId;
        this.photos = photos;

        this.transportType = transportType;
        this.locationData = locationData;
    }
}

export default TransportDTO;