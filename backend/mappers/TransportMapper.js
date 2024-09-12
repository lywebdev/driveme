import TransportDTO from "../DTOs/transport/transportDTO.js";
import {getHost} from "../utils/envHelper.js";

class TransportMapper {
    static entityToDTO(transportEntity) {
        return new TransportDTO({
            id: transportEntity._id,
            name: transportEntity.name,
            cost: transportEntity.cost,
            description: transportEntity.description,
            hasDelivery: transportEntity.hasDelivery,
            photos: transportEntity.photos.map(photo => `${getHost()}/uploads/transports/${transportEntity._id}/${photo}`),

            owner: transportEntity.ownerId,
            locationData: transportEntity.locationDataId,
            transportType: transportEntity.transportTypeId,
        });
    }
}

export default TransportMapper;