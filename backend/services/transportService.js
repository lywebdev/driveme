import Transport from "../models/TransportSchema.js";
import { errorTypes } from "../utils/constants/errorTypeConstants.js";
import BaseApiService from "./BaseApiService.js";
import {
  getUpdatableFields,
  idIsCorrect,
  responseTemplates,
} from "../utils/constants/responseConstants.js";

class TransportService extends BaseApiService {
  findAll = async () => {
    let transports = null;

    try {
      transports = await Transport.find();
    } catch (err) {
      return this.apiResponse({ ...responseTemplates.entity.gettingError });
    }

    return this.apiResponse({
      message: "Transports have been successfully obtained",
      data: transports,
    });
  };

  store = async (requestBody) => {
    if (
      await Transport.findOne({
        _id: requestBody?.id,
      })
    ) {
      return this.apiResponse({ ...responseTemplates.entity.alreadyExists });
    }

    const fields = {
      _id: requestBody?.id,
      name: requestBody.name,
      photo: requestBody.photo,
      cost: requestBody.cost,
      transportTypeId: requestBody.transportTypeId,
      ownerId: requestBody.ownerId,
      locationDataId: requestBody.locationDataId,
      description: requestBody.description,
      hasDelivery: requestBody.hasDelivery,
      photos: requestBody.photos,
    };

    let savedTransport = null;

    try {
      const transport = new Transport(fields);
      savedTransport = await transport.save();
    } catch (err) {
      if (err.name === errorTypes.validation) {
        const errors = Object.values(err.errors).map((error) => error.message);

        return this.apiResponse({
          ...responseTemplates.entity.savingFailed,
          data: errors,
        });
      }

      return this.apiResponse({
        ...responseTemplates.entity.savingFailed,
      });
    }

    return this.apiResponse({
      message: "Transport has been successfully created",
      data: savedTransport,
    });
  };

  findByIdAndUpdate = async (id, requestBody) => {
    try {
      if (!idIsCorrect(id)) {
        return this.apiResponse({
          ...responseTemplates.validation.id.invalidFormat,
        });
      }

      if (!(await Transport.findOne({ _id: id }))) {
        return this.apiResponse({
          ...responseTemplates.entity.notExists,
        });
      }

      const updatableFields = getUpdatableFields({
        name: requestBody.name,
        photo: requestBody.photo,
        cost: requestBody.cost,
        transportTypeId: requestBody.transportTypeId,
        ownerId: requestBody.ownerId,
        locationDataId: requestBody.locationDataId,
        description: requestBody.description,
        hasDelivery: requestBody.hasDelivery,
        photos: requestBody.photos,
      });

      let updatedTransport = null;

      try {
        updatedTransport = await Transport.findOneAndUpdate(
          { _id: id },
          updatableFields,
          { new: true }
        );
      } catch (err) {
        return this.apiResponse({
          ...responseTemplates.entity.savingFailed,
        });
      }

      if (await Transport.findOne({ _id: requestBody?.id })) {
        return this.apiResponse({ ...responseTemplates.entity.alreadyExists });
      }

      return this.apiResponse({
        ...responseTemplates.entity.updated,
        data: updatedTransport,
      });
    } catch (err) {
      return this.apiResponse({
        ...responseTemplates.exception,
      });
    }
  };

  removeById = async (id) => {
    if (!idIsCorrect(id)) {
      return this.apiResponse({
        ...responseTemplates.validation.id.invalidFormat,
      });
    }

    if (!(await Transport.findOne({ _id: id }))) {
      return this.apiResponse({ ...responseTemplates.entity.notExists });
    }

    try {
      await Transport.findByIdAndDelete(id);
    } catch (err) {
      return this.apiResponse({ ...responseTemplates.entity.deletingFailed });
    }

    return this.apiResponse({
      message: "Transport has been successfully deleted",
    });
  };
}

export default new TransportService();
