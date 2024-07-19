import TransportType from "../models/TransportTypeSchema.js";
import {errorTypes} from "../utils/constants/errorTypeConstants.js";
import BaseApiService from "./BaseApiService.js";
import {getUpdatableFields, idIsCorrect, responseTemplates} from "../utils/constants/responseConstants.js";

class TransportTypeService extends BaseApiService {
    findAll = async () => {
        let transportTypes = null;

        try {
            transportTypes = await TransportType.find();
        } catch (err) {
            return this.apiResponse({...responseTemplates.entity.gettingError});
        }

        return this.apiResponse({
            message: 'Transport types have been successfully obtained',
            data: transportTypes,
        });
    }

    store = async requestBody => {
        if (await TransportType.findOne({
            _id: requestBody?.id,
        })) {
            return this.apiResponse({...responseTemplates.entity.alreadyExists});
        }


        const fields = {
            _id: requestBody?.id,
            name: requestBody.name,
            photo: requestBody.photo,
        }

        let savedTransportType = null;
        try {
            const transportType = new TransportType(fields);
            savedTransportType = await transportType.save();
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
            data: savedTransportType,
        });
    }

    findByIdAndUpdate = async (id, requestBody) => {
        try {
            if (!idIsCorrect(id)) {
                return this.apiResponse({...responseTemplates.validation.id.invalidFormat});
            }

            if (!await TransportType.findOne({
                _id: id,
            })) {
                return this.apiResponse({...responseTemplates.entity.notExists});
            }


            const updatableFields = getUpdatableFields({
                name: requestBody.name,
                photo: requestBody.photo,
            });
            let updatedTransportType = null;

            try {
                updatedTransportType = await TransportType.findByIdAndUpdate(
                    id,
                    {
                        ...updatableFields
                    },
                    { new: true },
                );
            } catch (err) {
                return this.apiResponse({...responseTemplates.entity.savingFailed});
            }

            if (await TransportType.findOne({
                _id: requestBody?.id,
            })) {
                return this.apiResponse({...responseTemplates.entity.alreadyExists});
            }


            return this.apiResponse({
                ...responseTemplates.entity.updated,
                data: updatedTransportType,
            });
        } catch (err) {
            return this.apiResponse({...responseTemplates.exception});
        }
    }

    removeById = async id => {
        if (!idIsCorrect(id)) {
            return this.apiResponse({...responseTemplates.validation.id.invalidFormat});
        }

        if (!await TransportType.findOne({
            _id: id,
        })) {
            return this.apiResponse({...responseTemplates.entity.notExists});
        }


        try {
            await TransportType.findByIdAndDelete(id);
        } catch (err) {
            return this.apiResponse({...responseTemplates.entity.deletingFailed});
        }


        return this.apiResponse({
            message: 'The transport type has been removed successfully',
        });
    }
}


export default new TransportTypeService();