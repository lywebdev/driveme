import { useExampleTransportsStore } from "@store/useExampleTransportsStore.js";
import { NavLink } from "react-router-dom";
import routes from "@config/routes.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
import VehicleCard from "@components/shared/Vehicle/VehicleCard";
import { useState } from 'react';
import "./ExampleTransportsPage.css";
const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;

    const totalPages = Math.ceil(transports.length / cardsPerPage);

    const handlePageClick = (pageIndex) => {
        console.log("Changing to page:", pageIndex + 1);
        setCurrentPage(pageIndex + 1);
    };

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentTransports = transports.slice(startIndex, endIndex);

    return (
        <div>
            <PageTitle className="page-title">
                <PageTitle.Top className="text-centered top">
                Rent a vehicle near you!
                </PageTitle.Top>
            </PageTitle>

            <Container variants={[Container.bgColors.gray]}>
                <div className="vehicle-card-container">
                    {currentTransports.map((transport) => (
                        <VehicleCard key={transport.id} vehicle={transport} />
                    ))}
                </div>

                <div className="pagination-buttons">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </Container>

            <NavLink to={routes.home}>Go home</NavLink>
        </div>
    );
};

export default ExampleTransportsPage;
