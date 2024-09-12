import BaseApiService from "./BaseApiService.js";
import {responseTemplates} from "../utils/constants/responseConstants.js";
import {errorTypes} from "../utils/constants/errorTypeConstants.js";
import Payment from "../models/PaymentSchema.js";

class PaymentService extends BaseApiService {
    store = async requestBody => {
        const { orderId, id, amount, stripePaymentIntentId, stripeStatus } = requestBody;

        const updateFields = {
            amount,
            stripePaymentIntentId,
            stripeStatus,
        };

        let savedPayment = null;
        try {
            savedPayment = await Payment.findOneAndUpdate(
                { orderId }, // Search criteria
                { $set: updateFields }, // updatable fields
                { new: true, upsert: true } // Options: return the updated document and create a new one if not found
            );
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
            data: savedPayment,
        });
    }
}


export default new PaymentService();