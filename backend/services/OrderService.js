import BaseApiService from "./BaseApiService.js";
import {responseTemplates} from "../utils/constants/responseConstants.js";
import {errorTypes} from "../utils/constants/errorTypeConstants.js";
import Order from "../models/OrderSchema.js";
import OrderMapper from "../mappers/OrderMapper.js";

class OrderService extends BaseApiService {
    findByClientSecret = async clientSecret => {
        let order = null;
        try {
            order = await Order.findOne({
                clientSecret: clientSecret,
            });
        } catch (err) {
            console.log('err', err);
            return this.apiResponse({...responseTemplates.entity.notExists});
        }

        return this.apiResponse({
            message: 'OK',
            data: OrderMapper.entityToDTO(order),
        });
    }

    store = async requestBody => {
        if (await Order.findOne({
            _id: requestBody?.id,
        })) {
            return this.apiResponse({...responseTemplates.entity.alreadyExists});
        }

        const fields = {
            _id: requestBody?.id,
            name: requestBody.name,
            email: requestBody.email,
            phone: requestBody.phone,

            price: requestBody.price,
            totalPrice: requestBody.totalPrice,
            pickupLocation: requestBody.pickupLocation,

            transportId: requestBody.transportId,

            startDate: requestBody.startDate,
            endDate: requestBody.endDate,
            startTime: requestBody.startTime,
            endTime: requestBody.endTime,
            days: requestBody.days,

            clientSecret: requestBody.clientSecret,
        }

        let savedOrder = null;
        try {
            const payment = new Order(fields);
            savedOrder = await payment.save();
        } catch (err) {
            if (err.name === errorTypes.validation) {
                const errors = Object.values(err.errors).map(err => err.message);

                return this.apiResponse({
                    ...responseTemplates.entity.savingFailed,
                    data: errors,
                });
            }

            return this.apiResponse({...responseTemplates.entity.savingFailed});
        }

        return this.apiResponse({
            ...responseTemplates.entity.added,
            data: savedOrder,
        });
    }
}


export default new OrderService();