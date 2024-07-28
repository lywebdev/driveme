import TransportDTO from "../DTOs/transport/transportDTO.js";

class TransportMapper {
    static entityToDTO(transportEntity) {
        const host = `${process.env.HOST}:${process.env.PORT}`;

        return new TransportDTO({
            id: transportEntity._id,
            name: transportEntity.name,
            cost: transportEntity.cost,
            description: transportEntity.description,
            hasDelivery: transportEntity.hasDelivery,
            ownerId: transportEntity.ownerId,
            photos: transportEntity.photos.map(photo => `${host}/uploads/transports/${transportEntity._id}/${photo}`),

            locationData: transportEntity.locationData,
            transportType: transportEntity.transportType,
        });
    }
}

export default TransportMapper;