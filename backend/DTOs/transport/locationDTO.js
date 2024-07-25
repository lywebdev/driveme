class LocationDTO {
    id;
    address;
    city;
    postalCode;
    transportId;


    constructor(model) {
        this.id = model.id;
        this.address = model.address;
        this.city = model.city;
        this.postalCode = model.postalCode;
        this.transportId = model.transportId;
    }
}

export default LocationDTO;