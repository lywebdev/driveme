import OrderDTO from "../DTOs/OrderDTO.js";

class OrderMapper {
    static entityToDTO(orderEntity) {
        return new OrderDTO({
            id: orderEntity._id,
            name: orderEntity.name,
            email: orderEntity.email,
            phone: orderEntity.phone,
            pickupLocation: orderEntity.pickupLocation,
            price: orderEntity.price,
            totalPrice: orderEntity.totalPrice,
            startDate: orderEntity.startDate,
            endDate: orderEntity.endDate,
            startTime: orderEntity.startTime,
            endTime: orderEntity.endTime,
            transportId: orderEntity.transportId,
            days: orderEntity.days,
            clientSecret: orderEntity.clientSecret,
            createdAt: orderEntity.createdAt,
        });
    }
}

export default OrderMapper;