import VehicleCard from '@components/shared/Vehicle/VehicleCard';

const VehicleCardContainer = ({ currentItems }) => {
    return (
        <div className="vehicle-card-container">
            {currentItems.map((transport) => (
                <VehicleCard
                    key={transport.id}
                    name={transport.name}
                    price={transport.cost}
                    image={transport.photos[0]}
                    description={transport.description}
                    rating={transport.rating}
                    delivery={transport.hasDelivery}
                    location={transport.city}
                />
            ))}
        </div>
    );
};

export default VehicleCardContainer;