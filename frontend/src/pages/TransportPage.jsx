import Container from "@components/layouts/shared/Container";
import RentalForm from "@components/features/RentalForm/RentalForm";
import "./styles/TransportPage.scss";
import Transport from "@components/features/Transport/Transport.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TransportService from "../services/TransportService.js";
import {StepsProvider} from "react-step-builder";

const TransportPage = () => {
    const { id } = useParams();
    const [transport, setTransport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchTransport = async () => {
            let transportData = null;
            try {
                const fetchTransportResponse = await TransportService.findById(id);

                if (fetchTransportResponse.data.isSuccess) {
                    transportData = fetchTransportResponse.data.data;
                }
            } catch (err) {
                //
            } finally {
                setTransport(transportData);
                setIsLoading(false);
            }
        };

        fetchTransport();
    }, []);


    return (
        <div className="transport-page">
            <Container className='tp-main__container' variants={[Container.bgColors.gray]}>
                <div className="transport-page__container">
                    {
                        isLoading
                            ? <p>Loading...</p>
                            : <>
                                <div className="transport-page__left">
                                    <Transport transport={transport}/>
                                </div>
                                <div className="transport-page__right">
                                    <StepsProvider>
                                        <RentalForm
                                            className='rentalForm'
                                            transport={transport}
                                        />
                                        {/*{*/}
                                        {/*    clientSecret !== undefined && clientSecret !== '' && (*/}
                                        {/*        <CheckoutForm dpmCheckerLink={dpmCheckerLink} clientSecret={clientSecret} />*/}
                                        {/*    )*/}
                                        {/*}*/}
                                    </StepsProvider>
                                </div>
                            </>
                    }
                </div>
            </Container>
        </div>
    );
};

export default TransportPage;