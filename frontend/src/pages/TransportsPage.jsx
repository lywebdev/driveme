import {useExampleTransportsStore} from "@store/useExampleTransportsStore.js";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Container from "@components/layouts/shared/Container";
import {useState} from 'react';
import "./styles/TransportsPage.scss";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination/Pagination";
import Button from "../components/UI/Button/Button.jsx";
import TransportsContainer from "@components/features/Transports/TransportsContainer.jsx";
import useSortTransports from "../hooks/useSortTransports";
import Dropdown from "@components/UI/Dropdown/Dropdown.jsx";
import CategoryPageFilters from "@components/features/CategoryPage/CategoryPageFilters.jsx";
import {routes} from "@config/routes.js";

const ExampleTransportsPage = () => {
    const [transports] = useExampleTransportsStore((state) => [state.transports]);
    const [transportTypes, setTransportTypes] = useState(null);
    const [sorting, setSorting] = useState(null);
    const [location, setLocation] = useState(null);

    const {transports: sortedTransports, sortTransports} = useSortTransports(transports);

    const filteredTransports = sortedTransports.filter(transport =>
        transportTypes === null || transportTypes === 0 || transport.transportTypeId === transportTypes
    );

    const filteredLocation = filteredTransports.filter(transport =>
        location === null || location === "All" || transport.city === location
    );


    const {
        totalPages,
        handlePageClick,
        currentItems,
        setCurrentPage,
        currentPage,
        totalItems
    } = usePagination(filteredLocation, 12);


    const transportTypeOptions = [
        {value: 0, label: "All"},
        {value: 1, label: "Bike"},
        {value: 2, label: "Car"},
        {value: 3, label: "Roller"},
        {value: 4, label: "Scooter"},
    ];

    const sortingOptions = [
        {value: "None", label: "None"},
        {value: "Descending", label: "Descending"},
        {value: "Ascending", label: "Ascending"},
    ];

    const locationOptions = [
        {value: "All", label: "All"},
        {value: "Amsterdam", label: "Amsterdam"},
        {value: "Rotterdam", label: "Rotterdam"},
        {value: "The Hague", label: "The Hague"},
        {value: "Utrecht", label: "Utrecht"},
        {value: "Eindhoven", label: "Eindhoven"},
        {value: "Tilburg", label: "Tilburg"},
        {value: "Groningen", label: "Groningen"},
        {value: "Almere", label: "Almere"},
        {value: "Breda", label: "Breda"},
        {value: "Nijmegen", label: "Nijmegen"},
    ];
    const changeTransportTypeHandler = (selectedOption) => {
        setTransportTypes(selectedOption.value);
        setCurrentPage(1);
        setSorting("None");
    };

    const changeSortingHandler = (selectedOption) => {
        sortTransports(selectedOption.value);
        setSorting(selectedOption.value);
        setCurrentPage(1);
    };

    const changeLocationHandler = (selectedOption) => {
        setLocation(selectedOption.value);
        setCurrentPage(1);
    };


    return (
        <div className="transports-page">
            <Container>
                <PageTitle className="page-title">
                    <PageTitle.Top className="text-left top">Rent a vehicle near you!</PageTitle.Top>
                </PageTitle>

                <div className="location">
                    <Dropdown options={locationOptions}
                        variant={Dropdown.variants.location.name}
                        onChange={changeLocationHandler}
                        value={locationOptions.find(option => option.value === location)}
                    />
                </div>
            </Container>

            <Container variants={[Container.bgColors.gray]}>

                <CategoryPageFilters
                    attributesDropdown={
                        <Dropdown options={transportTypeOptions}
                            onChange={changeTransportTypeHandler}
                            value={transportTypeOptions.find(option => option.value === transportTypes)}
                        />
                    }
                    orderingDropdown={
                        <Dropdown options={sortingOptions}
                            variant={Dropdown.variants.ordering.name}
                            onChange={changeSortingHandler}
                            value={sortingOptions.find(option => option.value === sorting)}
                        />
                    }
                />

                <TransportsContainer transports={currentItems}
                    marginTop
                    className='main-container'
                    totalItems={totalItems}
                />

                <Pagination
                    totalPages={totalPages}
                    onPageClick={handlePageClick}
                    currentPage={currentPage}
                    className='pagination'
                />
                <Button variants={[Button.types.grayLighter]} url={routes.home}>Home</Button>
            </Container>
        </div>
    );
};

export default ExampleTransportsPage;
