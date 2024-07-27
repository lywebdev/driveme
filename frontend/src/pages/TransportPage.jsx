import Container from "@components/layouts/shared/Container";
import RentalForm from "@components/features/RentalForm/RentalForm";
import "./styles/TransportPage.scss";
import Transport from "@components/features/Transport/Transport.jsx";

const TransportPage = () => {
    const transport = {
        image: '@images/transports/bike.jpg',
        alt: 'scooter',
        name: 'BMW X3',
        owner: 'Dmitry Vasilkov',
        attributes: [
            {
                name: 'Engine',
                value: 'Electric',
            },
            {
                name: 'Has delivery',
                value: 'Yes',
            }
        ],

        description: ['Engine', 'hasdelivery'],
        description_values: ['Electric', 'Yes']
    };


    return (
        <div className="transport-page">
            <Container className='tp-main__container' variants={[Container.bgColors.gray]}>
                <div className="transport-page__container">
                    <div className="transport-page__left">
                        <Transport transport={transport} />
                    </div>
                    <div className="transport-page__right">
                        <RentalForm className='rentalForm' />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TransportPage;