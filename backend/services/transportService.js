import Transport from "../models/TransportSchema.js";
import { errorTypes } from "../utils/constants/errorTypeConstants.js";
import BaseApiService from "./BaseApiService.js";
import {
  getUpdatableFields,
  idIsCorrect,
  responseTemplates,
} from "../utils/constants/responseConstants.js";
import {splitZip} from "../utils/transportsHelper.js";
import TransportMapper from "../mappers/TransportMapper.js";
import PaginationDTO from "../DTOs/PaginationDTO.js";
import {isEmptyObject} from "../utils/objectHelper.js";

class TransportService extends BaseApiService {
  findAll = async (requestQuery) => {
    let filteredAndPaginatedTransports = null;
    try {
      filteredAndPaginatedTransports = await this.#getFilteredPaginatedTransports({requestQuery});
    } catch (err) {
      return this.apiResponse({ ...responseTemplates.entity.gettingError });
    }

    return this.apiResponse({
      message: "Transports have been successfully obtained",
      data: filteredAndPaginatedTransports,
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


  #getFilteredPaginatedTransports = async ({categorySlug, requestQuery}) => {
    const page = requestQuery.page || 1;
    const perPage = requestQuery['records'] || 12;
    const offset = (page - 1) * perPage;

    const priceFrom = requestQuery['price_from'] ? parseInt(requestQuery['price_from']) : null;
    const priceTo = requestQuery['price_to'] ? parseInt(requestQuery['price_to']) : null;
    const postalCodes = requestQuery['zip'] ? requestQuery['zip'].split(',').map(postalCode => splitZip(postalCode)) : null;
    const city = requestQuery.city ? requestQuery.city : null;
    const sortOrder = requestQuery.order === 'asc' ? 1 : -1;
    const priceOrder = requestQuery['price_order'] ?? null;

    const matchConditions = {};
    const sortConditions = {};


    // Filtering
    const priceFilter = {};
    if (priceFrom !== null) {
      priceFilter.$gte = priceFrom;
    }
    if (priceTo !== null) {
      priceFilter.$lte = priceTo;
    }


    if (postalCodes) {
      matchConditions['locationData.postalCode'] = {$in: postalCodes};
    }

    if (!isEmptyObject(priceFilter)) {
      matchConditions['cost'] = priceFilter;
    }

    if (categorySlug) {
      matchConditions["transportType._id"] = categorySlug;
    }

    if (city) {
      matchConditions['locationData.city'] = city;
    }

    // Sorting
    if (priceOrder) {
      if (priceOrder === 'min') {
        sortConditions['cost'] = 1;
      } else if (priceOrder === 'max') {
        sortConditions['cost'] = -1;
      }
    }

    sortConditions['createdAt'] = sortOrder;


    const transports = await Transport.aggregate([
      {
        $lookup: {
          from: "transportsLocationData",
          localField: "locationDataId",
          foreignField: "_id",
          as: "locationData",
        }
      },
      {
        $unwind: "$locationData",
      },

      {
        $lookup: {
          from: "transportTypes",
          localField: "transportTypeId",
          foreignField: "_id",
          as: "transportType",
        },
      },
      {
        $unwind: "$transportType",
      },

      {
        $match: matchConditions,
      },

      {
        $sort: sortConditions,
      },
      {
        $skip: offset,
      },
      {
        $limit: perPage,
      },
    ]);

    const totalItems = transports.length;


    return {
      items: transports.map(transport => TransportMapper.entityToDTO(transport)),
      pagination: new PaginationDTO({
        page,
        perPage,
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / perPage),
      }),
    }
  }
}

export default new TransportService();
