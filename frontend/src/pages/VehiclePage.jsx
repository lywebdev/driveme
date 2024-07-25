import Container from "@components/layouts/shared/Container";
import RentalForm from "@components/features/RentalForm/RentalForm";
import VehicleDetails from "@components/features/VehiclePage/VehicleDetails";
import VehicleDescription from "@components/features/VehiclePage/VehicleDescription";
import VehicleImage from "@components/features/VehiclePage/VehicleImage";
import "./styles/VehiclePage.scss";

const VehiclePage = () => {
    const vehicle = {
        image: '@images/transports/bike.jpg',
        alt: 'scooter',
        title: 'BMW X3',
        owner: 'Dmitry Vasilkov',
        description: ['Engine', 'hasdelivery'],
        description_values: ['Electric', 'Yes']
    };
    return (
        <div className="vehicle_page">
            <Container variants={[Container.bgColors.gray]}>
                <div className="vehicle_page__container" >
                    <div className="vehicle_page__left">
                        <VehicleImage src={vehicle.image} alt={vehicle.alt} />
                        <VehicleDetails title={vehicle.title} owner={vehicle.owner} />
                        <VehicleDescription descriptions={vehicle.description} values={vehicle.description_values} />
                    </div>
                    <div className="vehicle_page__right">
                        <RentalForm />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default VehiclePage;