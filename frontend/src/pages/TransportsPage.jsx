import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Container from "@layouts/shared/Container.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Dropdown from "@components/UI/Dropdown/Dropdown.jsx";
import CategoryPageFilters from "@components/features/CategoryPage/CategoryPageFilters.jsx";
import Button from "@components/UI/Button/Button.jsx";
import TransportsContainer from "@components/features/Transports/TransportsContainer.jsx";
import Pagination from "@components/shared/Pagination/Pagination.jsx";

import { routes } from "@config/routes.js";
import { useTransportsStore } from "@store/useTransportsStore.js";
import { useTransportLocationStore } from "@store/useTransportLocationStore.js";
import TransportService from "../services/TransportService.js";
import TransportLocationService from "../services/TransportLocationService.js";

import './styles/TransportsPage.scss';

const TransportsPage = () => {
    const [transports, setTransports, pagination, setIsLoading] = useTransportsStore(state => [
        state.transports,
        state.setTransports,
        state.pagination,
        state.setIsLoading,
    ]);
    const [cities, setCities] = useTransportLocationStore(state => [
        state.cities,
        state.setCities,
    ]);

    const [searchParams, setSearchParams] = useSearchParams();
    const urlLocation = useLocation();
    const params = new URLSearchParams(urlLocation.search);

    let page = params.get('page');
    let sortingParameter = params.get('sort_order');
    let cityParameter = params.get('city');

    const sortingOptions = [
        { value: null, label: "None" },
        { value: 'desc', label: "Descending" },
        { value: 'asc', label: "Ascending" },
    ];

    useEffect(() => {
        setIsLoading(true);

        const abortController = new AbortController();

        const transportsQueryParams = {
            page: page || null,
            price_order: searchParams.get('price_order') || null,
            order: sortingParameter || null,
            price_from: searchParams.get('price_from') || null,
            price_to: searchParams.get('price_to') || null,
            city: cityParameter || null,
        };

        const fetchData = async () => {
            try {
                const requests = [await TransportService.findAll({queryParams: transportsQueryParams})];
                if (!cities || cities.length === 0) {
                    requests.push(TransportLocationService.findAllCities());
                }

                const [transportsResponse, citiesResponse] = await Promise.all(requests);

                if (abortController.signal.aborted) return;

                handleTransportsResponse(transportsResponse);
                handleCitiesResponse(citiesResponse);

            } catch (error) {
                //
            } finally {
                setIsLoading(false);
            }
        };

        const handleTransportsResponse = (response) => {
            if (response?.data?.isSuccess) {
                const { items, pagination } = response.data.data;
                setTransports(items, pagination);
            }
        };

        const handleCitiesResponse = (response) => {
            if (!cities || cities.length === 0) {
                if (response?.data?.isSuccess) {
                    const citiesArray = response.data.data.map(city => ({
                        label: city,
                        value: city,
                    }));
                    citiesArray.unshift({ label: 'All cities', value: null });
                    setCities(citiesArray);
                }
            }
        };


        fetchData();

        return () => abortController.abort();
    }, [page, sortingParameter, cityParameter]);

    const changeSortingHandler = (selectedOption) => {
        const value = selectedOption.value;

        if (value === null) {
            params.delete('sort_order');
        } else {
            params.set('sort_order', value);
        }
        setSearchParams(params);
    };

    const changeLocationHandler = (selectedOption) => {
        const value = selectedOption.value;

        if (value === null) {
            params.delete('city');
            params.delete('page');
        } else {
            params.set('city', value);
            params.delete('page');
        }

        setSearchParams(params);
    };

    const getPaginationBtnPath = (pageNumber) => {
        const regex = /page=\d+/;
        const stringParams = params.toString().replace(regex, `page=${pageNumber}`);

        return `${urlLocation.pathname}?${stringParams}`;
    };


    return (
        <div className="transports-page">
            <Container>
                <PageTitle className="page-title">
                    <PageTitle.Top className="text-left top">Rent a vehicle near you!</PageTitle.Top>
                </PageTitle>

                <div className="location">
                    <Dropdown
                        options={cities}
                        type={Dropdown.types.location.name}
                        onChange={changeLocationHandler}
                        placeholderText='All cities'
                        value={cities.find(option => option.value === cityParameter)}
                    />
                </div>
            </Container>

            <Container variants={[Container.bgColors.gray]}>
                <CategoryPageFilters
                    orderingDropdown={
                        <Dropdown
                            options={sortingOptions}
                            variant={Dropdown.types.ordering.name}
                            onChange={changeSortingHandler}
                            value={sortingOptions.find(option => option.value === sortingParameter)}
                        />
                    }
                />

                <TransportsContainer
                    transports={transports || []}
                    marginTop
                    className='main-container'
                    totalItems={pagination?.totalItems || 0}
                    perPage={pagination?.perPage || 0}
                />
                <Pagination
                    className='pagination'
                    totalPages={pagination?.totalPages || 0}
                    currentPage={pagination?.page || 1}
                    pathGenerationHandler={getPaginationBtnPath}
                />

                <Button variants={[Button.types.grayLighter]} url={routes.home}>Home</Button>
            </Container>
        </div>
    );
};

export default TransportsPage;
