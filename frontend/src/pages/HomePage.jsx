import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import './styles/HomePage.scss';
import TransportTypeCards from "@components/features/TransportType/TransportTypeCards.jsx";
import RecentOffers from "@components/features/RecentOffers/RecentOffers.jsx";
import Container from "@layouts/shared/Container.jsx";
import SectionTitle from "@components/UI/SectionTitle/SectionTitle.jsx";
import PopularRentTopics from "@components/features/PopularRent/PopularRentTopics.jsx";
import {useTransportTypeStore} from "@store/useTransportTypeStore.js";
import {useEffect} from "react";
import TransportTypeService from "../services/TransportTypeService.js";

const HomePage = () => {
    console.log('HomePage');
    const [transportTypes, setTransportTypes, setIsLoading] = useTransportTypeStore(state => [
        state.transportTypes,
        state.setTransportTypes,
        state.setIsLoading,
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const response = await TransportTypeService.findAll();
            if (response.data.isSuccess) {
                return response.data.data;
            }

            throw Error(response.data.errors);
        };

        fetchData().then(transportTypes => {
            setTransportTypes(transportTypes);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [setTransportTypes, setIsLoading]);



    return <div className="home-page">
        <Container>
            <PageTitle className='page-title'>
                <PageTitle.Top className='text-centered top'>Rent a vehicle near you!</PageTitle.Top>
                <PageTitle.Text className='text-centered text'>All possible offers of transports on the scale of the
                    Netherlands
                    are combined here</PageTitle.Text>
            </PageTitle>
        </Container>

        <Container>
            <TransportTypeCards transportTypes={transportTypes} className='transport-type-cards'/>
        </Container>

        <Container variants={[Container.bgColors.gray]}>
            <RecentOffers
                className='recent-offers'
                marginTop
                title={<SectionTitle isLink tag='New'>Recent offers</SectionTitle>}/>
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