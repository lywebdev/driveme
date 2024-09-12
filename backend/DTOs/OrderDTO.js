class OrderDTO {
    id;
    name;
    email;
    phone;
    pickupLocation;
    price;
    totalPrice;
    startDate;
    endDate;
    startTime;
    endTime;
    transportId;
    days;
    clientSecret;
    createdAt;


    constructor(model) {
        this.id = model._id || model.id;
        this.name = model.name;
        this.email = model.email;
        this.phone = model.phone;
        this.pickupLocation = model.pickupLocation;
        this.price = model.price;
        this.totalPrice = model.totalPrice;
        this.startDate = model.startDate;
        this.endDate = model.endDate;
        this.startTime = model.startTime;
        this.endTime = model.endTime;
        this.transportId = model.transportId;
        this.days = model.days;
        this.clientSecret = model.clientSecret;
        this.createdAt = model.createdAt;
    }
}

export default OrderDTO;