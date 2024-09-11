import BaseApiService from "./BaseApiService.js";
import {responseTemplates} from "../utils/constants/responseConstants.js";
import TransportLocationData from "../models/TransportLocationDataSchema.js";

class TransportTypeService extends BaseApiService {
    findAllCities = async () => {
        let cities = null;

        try {
            cities = await TransportLocationData.distinct('city');
        } catch (err) {
            return this.apiResponse({...responseTemplates.entity.gettingError});
        }

        return this.apiResponse({
            message: 'The list of cities has been successfully received',
            data: cities,
        });
    }
}


export default new TransportTypeService();