import { useExampleTransportsStore } from "@store/useExampleTransportsStore.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
import { useState } from 'react';
import "./styles/TransportsPage.scss";
import Dropdown from 'react-dropdown';
import usePagination from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination/Pagination";
import DropdownArrows from "../components/shared/DropdownArrows/DropdownArrows";
import Button from "../components/UI/Button/Button.jsx";
import { resolveAlias } from "@helpers/imageHelper";
import CategoryTransports from "../components/features/CategoryTransports/CategoryTransports.jsx";
import useSortTransports from "../hooks/useSortTransports";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [vehicleTypes, setVehicleTypes] = useState(null);
    const [sorting, setSorting] = useState("None");
    const [location, setLocation] = useState(null);

    const { transports : sortedTransports, sortTransports } = useSortTransports(transports);

    const filteredTransports = sortedTransports.filter(transport =>
        vehicleTypes === null || vehicleTypes === 0 || transport.transportTypeId === vehicleTypes
    );

    const filteredLocation = filteredTransports.filter(transport =>
        location === null || location === "All" || transport.city === location
    );
    


    const { totalPages, handlePageClick, currentItems, setCurrentPage, currentPage } = usePagination(filteredLocation, 8);

    

    const vehicleTypeOptions = [
        { value: 0, label: "All" },
        { value: 1, label: "Bike" },
        { value: 2, label: "Car" },
        { value: 3, label: "Roller" },
        { value: 4, label: "Scooter" },
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
        sortTransports(selectedOption.value);
        setSorting(selectedOption.value);
        setCurrentPage(1);
    };

    const handleLocationChange = (selectedOption) => {
        console.log(selectedOption);
        setLocation(selectedOption.value);
        setCurrentPage(1);
    };


    return (
        <div className="transports-page">
            <Container className="transports-container" variants={[Container.bgColors.gray]}>
                <PageTitle className="page-title">
                    <PageTitle.Top className="text-left top">
                        Rent a vehicle near you!
                    </PageTitle.Top>
                    <div className="location-container">
                        <div className="location-wrapper">
                            <Dropdown
                                options={locationOptions}
                                placeholder={
                                    <div className="location-placeholder">
                                        <img src={resolveAlias('@images/icons/locationicon.svg')} alt="Location icon" className="placeholder-icon" />
                                        <span>Select Location...</span>
                                    </div>
                                }
                                className="location-dropdown"
                                controlClassname="location-control"
                                menuClassname="location-menu"
                                arrowClassName="location-arrow"
                                arrowClosed={<DropdownArrows.ArrowClosed />} 
                                arrowOpen={<DropdownArrows.ArrowOpen />}
                                onChange={handleLocationChange}
                                value={locationOptions.find(option => option.value === location)}
                            />
                        </div>
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
                <CategoryTransports
                    currentItems={currentItems}

                />

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
