import { useExampleTransportsStore } from "@store/useExampleTransportsStore.js";
import { NavLink } from "react-router-dom";
import routes from "@config/routes.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
//import VehicleCard from "@components/shared/Vehicle/VehicleCard";
import { useState } from 'react';
import "./ExampleTransportsPage.css";
import Dropdown from 'react-dropdown';
import usePagination from "../hooks/usePagination";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [vehicleTypes, setVehicleTypes] = useState(0);
    const [sorting, setSorting] = useState("None");

    // Filter transports based on selected vehicle type
    const filteredTransports = transports.filter(transport =>
        vehicleTypes === 0 || transport.transportTypeId === vehicleTypes
    );
    


    const { totalPages, handlePageClick, currentTransports, setCurrentPage } = usePagination(filteredTransports, 8);

    const ArrowClosed = () => <span>&#9660;</span>;
    const ArrowOpen = () => <span>&#9650;</span>;

    const vehicleTypeOptions = [
        { value: 0, label: "All" },
        { value: 1, label: "Car" },
        { value: 2, label: "Scooter" },
        { value: 3, label: "Bike" },
    ];

    const sortingOptions = [
        { value: "None", label: "None" },
        { value: "Descending", label: "Descending" },
        { value: "Ascending", label: "Ascending" },
    ];

    const handleVehicleTypeChange = (selectedOption) => {
        console.log(selectedOption);
        setVehicleTypes(selectedOption.value);
        setCurrentPage(1);
        setSorting("None");
    };

    const handleSortingChange = (selectedOption) => {
        console.log(selectedOption);
        
        switch (selectedOption.value) {
        case "Descending":
            transports.sort((a, b) => b.cost - a.cost);
            break;
        case "Ascending":
            transports.sort((a, b) => a.cost - b.cost);
            break;
        default:
            transports.sort((a, b) => a.id - b.id);
            break;
        }
        
        setSorting(selectedOption.value);
        setCurrentPage(1);
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
                    <Dropdown 
                        options={vehicleTypeOptions} 
                        onChange={handleVehicleTypeChange} 
                        value={vehicleTypeOptions.find(option => option.value === vehicleTypes)} 
                        placeholder="Select Vehicle Type" 
                        arrowClosed={<ArrowClosed />} 
                        arrowOpen={<ArrowOpen />} 
                    />
                    <Dropdown 
                        options={sortingOptions} 
                        onChange={handleSortingChange} 
                        value={sortingOptions.find(option => option.value === sorting)} 
                        placeholder="Select Sorting Option" 
                        arrowClosed={<ArrowClosed />} 
                        arrowOpen={<ArrowOpen />} 
                    />
                </div>
                <div className="vehicle-card-container">
                    {currentTransports.map((transport) => (
                        <div key={transport.id}>
                            <p>{transport.name}</p>
                            <p>{transport.cost}</p>
                            <p>{transport.description}</p>
                            <p>{transport.transportTypeId}</p>
                        </div>
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
