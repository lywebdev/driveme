import BaseApiService from "./BaseApiService.js";
import {responseTemplates} from "../utils/constants/responseConstants.js";
import {errorTypes} from "../utils/constants/errorTypeConstants.js";
import Slot from "../models/SlotSchema.js";
import SlotOverlapError from "../models/errors/SlotOverlapError.js";

class SlotService extends BaseApiService {
    store = async (requestBody) => {


        const fields = {
            start: requestBody.start_time,
            end: requestBody.end_time,
            date: requestBody.date,
            available: true,
            transportId: requestBody.transport_id,
        };

        let savedSlot = null;

        try {
            const slot = new Slot(fields);
            savedSlot = await slot.save();
        } catch (err) {
            if (err.name === errorTypes.validation) {
                const errors = Object.values(err.errors).map((error) => error.message);

                return this.apiResponse({
                    ...responseTemplates.entity.savingFailed,
                    data: errors,
                });
            } else if (err instanceof SlotOverlapError) {
                return this.apiResponse({
                    message: err.message,
                    status: err.statusCode,
                });
            }


            return this.apiResponse({
                ...responseTemplates.entity.savingFailed,
            });
        }

        return this.apiResponse({
            message: "Slot has been successfully created",
            data: savedSlot,
        });
    };
}


export default new SlotService();