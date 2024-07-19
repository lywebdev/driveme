import './styles/HomePage.scss';
import TransportTypeCards from "@components/features/TransportType/TransportTypeCards.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import VehicleTypeCards from "@components/features/VehicleType/VehicleTypeCards.jsx";
import RecentOffers from "@components/features/RecentOffers/RecentOffers.jsx";
import Container from "@layouts/shared/Container.jsx";
import SectionTitle from "@components/UI/SectionTitle/SectionTitle.jsx";
import PopularRentTopics from "@components/features/PopularRent/PopularRentTopics.jsx";

const HomePage = () => {
    console.log('HomePage');

    return <div className="home-page">
        <Container>
            <PageTitle className='page-title'>
                <PageTitle.Top className='text-centered top'>Rent a vehicle near you!</PageTitle.Top>
                <PageTitle.Text className='text-centered text'>All possible offers of vehicles on the scale of the Netherlands
                    are combined here</PageTitle.Text>
            </PageTitle>
        </Container>

        <Container>
            <TransportTypeCards className='vehicle-type-cards' />
        </Container>

        <Container variants={[Container.bgColors.gray]}>
            <RecentOffers
                className='recent-offers'
                marginTop
                title={<SectionTitle isLink tag='New'>Recent offers</SectionTitle>}
            />
        </Container>

        <Container>
            <PopularRentTopics
                className='popular-rent-topics'
                marginTop
                title={<SectionTitle withArrow={true} isLink>Popular rental topics</SectionTitle>}
            />
        </Container>
    </div>;
};

export default HomePage;