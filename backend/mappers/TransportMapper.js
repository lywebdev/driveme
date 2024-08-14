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
            ownerId: transportEntity.ownerId,
            photos: transportEntity.photos.map(photo => `${getHost()}/uploads/transports/${transportEntity._id}/${photo}`),

            locationData: transportEntity.locationData,
            transportType: transportEntity.transportType,
        });
    }
}

export default TransportMapper;