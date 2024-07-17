import { useExampleTransportsStore } from "@store/useExampleTransportsStore.js";
import { NavLink } from "react-router-dom";
import routes from "@config/routes.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
import VehicleCard from "@components/shared/Vehicle/VehicleCard";
import { useState } from 'react';
import "./ExampleTransportsPage.css";
import Dropdown from 'react-dropdown';
import usePagination from "../hooks/usePagination";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [vehicleTypes, setVehicleTypes] = useState("All");
    const [sorting, setSorting] = useState("None");

    const { totalPages, handlePageClick, currentTransports} = usePagination(transports, 8);
    
    const ArrowClosed = () => <span>&#9660;</span>;
    const ArrowOpen = () => <span>&#9650;</span>;
    const vehicleTypeOptions = [
        { value: "0", label: "All" },
        { value: "1", label: "Car" },
        { value: "2", label: "Scooter" },
        { value: "3", label: "Bike" },
    ];

    const sortingOptions = [
        { value: "None", label: "None" },
        { value: "Descending", label: "Descending" },
        { value: "Ascending", label: "Ascending" },
        { value: "Rating", label: "Rating" },

    ];


    const handleVehicleTypeChange = (selectedOption) => {
        console.log(selectedOption);
        setVehicleTypes(selectedOption.value);
    };


    const handleSortingChange = (selectedOption) => {
        console.log(selectedOption);
        setSorting(selectedOption.value);
    };


    return (
        <div>
            <PageTitle className="page-title">
                <PageTitle.Top className="text-centered top">
                Rent a vehicle near you!

                </PageTitle.Top>
            </PageTitle>

            <Container variants={[Container.bgColors.gray]}>
                <div className="dropdown-container">
                    <Dropdown options= {vehicleTypeOptions} onChange={handleVehicleTypeChange} value={vehicleTypes} placeholder={vehicleTypeOptions[0]} arrowClosed={<ArrowClosed />} arrowOpen={<ArrowOpen />} />
                    <Dropdown options= {sortingOptions} onChange={handleSortingChange} value={sorting} placeholder={sortingOptions[0]} arrowClosed={<ArrowClosed />} arrowOpen={<ArrowOpen />} />
                </div>
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
