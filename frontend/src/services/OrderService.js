import $api from "@config/http.js";

export default class OrderService {
    static async createOrder(orderData, clientSecret) {
        return $api.post('/orders', {
            name: orderData.name,
            email: orderData.email,
            phone: orderData.phone,

            price: orderData.price,
            totalPrice: orderData.totalPrice,
            pickupLocation: orderData.pickupLocation,
            transportId: orderData.transportId,

            startDate: orderData.startDate,
            endDate: orderData.endDate,
            startTime: orderData.startTime,
            endTime: orderData.endTime,
            days: orderData.days,

            clientSecret: clientSecret,
        });
    }

    static async getOrderDataByClientSecret(clientSecret) {
        return $api.get('/orders', {
            clientSecret,
        });
    }
}