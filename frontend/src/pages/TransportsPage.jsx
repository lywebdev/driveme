import { useExampleTransportsStore } from "@store/useExampleTransportsStore.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
import { useState } from 'react';
import "./styles/TransportsPage.scss";
import ReactDropdown from 'react-dropdown';
import usePagination from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination/Pagination";
import Button from "../components/UI/Button/Button.jsx";
import { resolveAlias } from "@helpers/imageHelper";
import CategoryTransports from "../components/features/CategoryTransports/CategoryTransports.jsx";
import useSortTransports from "../hooks/useSortTransports";
import ArrowClosed from "@components/UI/Arrows/ArrowClosed.jsx";
import ArrowOpened from "@components/UI/Arrows/ArrowOpened.jsx";
import Dropdown from "@components/UI/Dropdown/Dropdown.jsx";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [transportTypes, setTransportTypes] = useState(null);
    const [sorting, setSorting] = useState("None");
    const [location, setLocation] = useState(null);

    const { transports : sortedTransports, sortTransports } = useSortTransports(transports);

    const filteredTransports = sortedTransports.filter(transport =>
        transportTypes === null || transportTypes === 0 || transport.transportTypeId === transportTypes
    );

    const filteredLocation = filteredTransports.filter(transport =>
        location === null || location === "All" || transport.city === location
    );


    const { totalPages, handlePageClick, currentItems, setCurrentPage, currentPage } = usePagination(filteredLocation, 8);

    

    const transportTypeOptions = [
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
    const changeTransportTypeHandler = (selectedOption) => {
        console.log(selectedOption);
        setTransportTypes(selectedOption.value);
        setCurrentPage(1);
        setSorting("None");
    };

    const changeSortingHandler = (selectedOption) => {
        console.log(selectedOption);
        sortTransports(selectedOption.value);
        setSorting(selectedOption.value);
        setCurrentPage(1);
    };

    const changeLocationHandler = (selectedOption) => {
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
                            <ReactDropdown
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
                                arrowClosed={<ArrowClosed />}
                                arrowOpen={<ArrowOpened />}
                                onChange={changeLocationHandler}
                                value={locationOptions.find(option => option.value === location)}
                            />
                        </div>
                    </div>
                </PageTitle>


                <div className="dropdown-container">


                    <Dropdown options={transportTypeOptions}
                        onChange={changeTransportTypeHandler}
                        value={transportTypeOptions.find(option => option.value === transportTypes)}
                    />

                    <ReactDropdown
                        options={transportTypeOptions}
                        onChange={changeTransportTypeHandler}
                        value={transportTypeOptions.find(option => option.value === transportTypes)}
                        placeholder="Select Vehicle Type"
                        arrowClosed={<ArrowClosed />}
                        arrowOpen={<ArrowOpened />}
                    />
                    <ReactDropdown
                        options={sortingOptions} 
                        onChange={changeSortingHandler} 
                        value={sortingOptions.find(option => option.value === sorting)} 
                        placeholder="Select Sorting Option"
                        arrowClosed={<ArrowClosed />}
                        arrowOpen={<ArrowOpened />}
                    />
                </div>
                <CategoryTransports
                    transports={currentItems}
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
