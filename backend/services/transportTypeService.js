import TransportType from "../models/TransportTypeSchema.js";
import {getUpdatableFields, idIsCorrect, responseMessages} from "../utils/modelsHelper.js";
import {apiResponse} from "./baseService.js";
import {errorTypes} from "../utils/constants/errorTypeConstants.js";

export const findAll = async () => {
    let transportTypes = null;

    try {
        transportTypes = await TransportType.find();
    } catch (err) {
        return apiResponse({...responseMessages.entity.gettingError});
    }

    return apiResponse({
        message: 'Transport types have been successfully obtained',
        data: transportTypes,
    });
}

export const store = async requestBody => {
    if (await TransportType.findOne({
        _id: requestBody?.id,
    })) {
        return apiResponse({...responseMessages.entity.alreadyExists});
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

            return apiResponse({
                ...responseMessages.entity.savingFailed,
                data: errors,
            });
        }

        return apiResponse({...responseMessages.entity.savingFailed});
    }

    return apiResponse({
        ...responseMessages.entity.added,
        data: savedTransportType,
    });
}

export const findByIdAndUpdate = async (id, requestBody) => {
    if (!idIsCorrect(id)) {
        return apiResponse({...responseMessages.validation.id.invalidFormat});
    }

    if (!await TransportType.findOne({
        _id: id,
    })) {
        return apiResponse({...responseMessages.entity.notExists});
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
        return apiResponse({...responseMessages.entity.savingFailed});
    }

    if (await TransportType.findOne({
        _id: requestBody?.id,
    })) {
        return apiResponse({...responseMessages.entity.alreadyExists});
    }


    return apiResponse({
        ...responseMessages.entity.updated,
        data: updatedTransportType,
    });
}

export const removeById = async id => {
    if (!idIsCorrect(id)) {
        return apiResponse({...responseMessages.validation.id.invalidFormat});
    }

    if (!await TransportType.findOne({
        _id: id,
    })) {
        return apiResponse({...responseMessages.entity.notExists});
    }


    try {
        await TransportType.findByIdAndDelete(id);
    } catch (err) {
        return apiResponse({...responseMessages.entity.deletingFailed});
    }


    return apiResponse({
        message: 'The transport type has been removed successfully',
    });
}