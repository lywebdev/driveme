import { useExampleTransportsStore } from "@store/useExampleTransportsStore.js";
//import { NavLink } from "react-router-dom";
//import routes from "@config/routes.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
//import VehicleCard from "@components/shared/Vehicle/VehicleCard";
import { useState } from 'react';
import "./styles/TransportsPage.scss";
import Dropdown from 'react-dropdown';
import usePagination from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination/Pagination";
import DropdownArrows from "../components/shared/DropdownArrows/DropdownArrows";
import Button from "../components/UI/Button/Button.jsx";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [vehicleTypes, setVehicleTypes] = useState(0);
    const [sorting, setSorting] = useState("None");

    // Filter transports based on selected vehicle type
    const filteredTransports = transports.filter(transport =>
        vehicleTypes === 0 || transport.transportTypeId === vehicleTypes
    );
    


    const { totalPages, handlePageClick, currentItems, setCurrentPage, currentPage } = usePagination(filteredTransports, 8);

    

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

    const locationOptions = [
        { value: "All", label: "All" },
        { value: "Amsterdam", label: "Amsterdam" },
        { value: "Rotterdam", label: "Rotterdam" },
        { value: "The Hague", label: "The Hague" },
        { value: "Utrecht", label: "Utrecht" },
        { value: "Eindhoven", label: "Eindhoven" },
        { value: "Tilburg", label: "Tilburg" },
        { value: "Groningen", label: "Groningen" },
        { value: "Almere", label: "Almere" },
        { value: "Breda", label: "Breda" },
        { value: "Nijmegen", label: "Nijmegen" },
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
        <div className="transports-page">
            <Container className="transports-container" variants={[Container.bgColors.gray]}>
                <PageTitle className="page-title">
                    <PageTitle.Top className="text-left top">
                        Rent a vehicle near you!
                    </PageTitle.Top>
                    <div className="dropdown-container">
                        <Dropdown
                            options={locationOptions}
                            placeholder="Select Location..."
                        />
                    </div>
                </PageTitle>


                <div className="dropdown-container">
                    <Dropdown 
                        options={vehicleTypeOptions} 
                        onChange={handleVehicleTypeChange} 
                        value={vehicleTypeOptions.find(option => option.value === vehicleTypes)} 
                        placeholder="Select Vehicle Type" 
                        arrowClosed={<DropdownArrows.ArrowClosed />}
                        arrowOpen={<DropdownArrows.ArrowOpen />} 
                    />
                    <Dropdown 
                        options={sortingOptions} 
                        onChange={handleSortingChange} 
                        value={sortingOptions.find(option => option.value === sorting)} 
                        placeholder="Select Sorting Option" 
                        arrowClosed={<DropdownArrows.ArrowClosed />} 
                        arrowOpen={<DropdownArrows.ArrowOpen />}
                    />
                </div>
                <div className="vehicle-card-container">
                    {currentItems.map((transport) => (
                        <div key={transport.id}>
                            <p>{transport.name}</p>
                            <p>{transport.cost}</p>
                            <p>{transport.description}</p>
                            <p>{transport.transportTypeId}</p>
                        </div>
                    ))}
                </div>

                <Pagination
                    totalPages={totalPages}
                    onPageClick={handlePageClick}
                    currentPage={currentPage}
                />
                <Button
                    variants={[Button.types.grayLighter, Button.types.rounded]}
                    url="/"
                >
                    Home
                </Button>
            </Container>

            
        </div>
    );
};

export default ExampleTransportsPage;
