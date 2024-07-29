import Container from "@layouts/shared/Container.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import Dropdown from "@components/UI/Dropdown/Dropdown.jsx";
import CategoryPageFilters from "@components/features/CategoryPage/CategoryPageFilters.jsx";
import Button from "@components/UI/Button/Button.jsx";
import {routes} from "@config/routes.js";
import {useEffect, useState} from "react";
import {useTransportsStore} from "@store/useTransportsStore.js";
import TransportService from "../services/TransportService.js";
import TransportsContainer from "@components/features/Transports/TransportsContainer.jsx";
import {useLocation, useSearchParams} from "react-router-dom";
import Pagination from "@components/shared/Pagination/Pagination.jsx";
import './styles/TransportsPage.scss';
import TransportLocationService from "../services/TransportLocationService.js";
import {useTransportLocationStore} from "@store/useTransportLocationStore.js";

const TransportsPage = () => {
    console.log('render TransportPage');
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
    const [sorting, setSorting] = useState(null);
    const [cityLocation, setCityLocation] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const urlLocation = useLocation();
    const params = new URLSearchParams(urlLocation.search);

    const page = params.get('page');
    const sortingParameter = params.get('sort_order');
    const cityParameter = params.get('city');

    const sortingOptions = [
        {value: null, label: "None"},
        {value: 'desc', label: "Descending"},
        {value: 'asc', label: "Ascending"},
    ];

    const changeSortingHandler = (selectedOption) => {
        const value = selectedOption.value;

        if (value === null) {
            params.delete('sort_order');
            setSearchParams(params);
            setSorting(null);
        } else if (value === 'desc') {
            params.set('sort_order', 'desc');
            setSearchParams(params);
            setSorting('desc');
        } else if (value === 'asc') {
            params.set('sort_order', 'asc');
            setSearchParams(params);
            setSorting('asc');
        }
    };

    const changeLocationHandler = (selectedOption) => {
        const value = selectedOption.value;

        if (value === null) {
            params.delete('city');
            setSearchParams(params);
            params.set('page', 1);
            setCityLocation(null);
        } else {
            params.set('city', value);
            params.set('page', 1);
            setSearchParams(params);
            setCityLocation(value);
        }
    };

    const getPaginationBtnPath = (pageNumber) => {
        const currentPageNumber = pageNumber || 1;

        params.set('page', `${currentPageNumber}`);

        return `${urlLocation.pathname}?${params.toString()}`;
    };


    useEffect(() => {
        setIsLoading(true);


        const fetchData = async () => {
            let transportsData = null,
                citiesData = null;


            try {
                const transportsQueryParams = {
                    page: page || null,
                    price_order: searchParams.get('price_order') || null,
                    order: sortingParameter || null,
                    price_from: searchParams.get('price_from') || null,
                    price_to: searchParams.get('price_to') || null,
                    city: cityParameter || null,
                };

                const requests = [
                    await TransportService.findAll({
                        queryParams: transportsQueryParams,
                    }),
                ];

                if (!cities || cities.length === 0) {
                    requests.push(await TransportLocationService.findAllCities());
                }


                const [
                    transportsResponse,
                    citiesResponse
                ] = await Promise.all(requests);

                transportsData = transportsResponse;
                citiesData = citiesResponse;
            } catch (err) {
                //
            } finally {
                if (transportsData?.data?.isSuccess) {
                    const {items, pagination} = transportsData.data.data;

                    setTransports(items, pagination);
                }

                if (!cities || cities.length === 0) {
                    if (citiesData?.data?.isSuccess) {
                        let citiesArray = citiesData.data.data.map(city => ({
                            label: city,
                            value: city,
                        }));

                        citiesArray.unshift({
                            label: 'All cities',
                            value: null,
                        });

                        setCities(citiesArray);
                    }
                }


                setIsLoading(false);
            }
        };



        fetchData();
    }, [page, sorting, cityLocation]);


    return (
        <div className="transports-page">
            <Container>
                <PageTitle className="page-title">
                    <PageTitle.Top className="text-left top">Rent a vehicle near you!</PageTitle.Top>
                </PageTitle>

                <div className="location">
                    <Dropdown options={cities}
                        variant={Dropdown.variants.location.name}
                        onChange={changeLocationHandler}
                        placeholderText='All cities'
                        value={cities.find(option => option.value === cityParameter)}
                    />
                </div>
            </Container>

            <Container variants={[Container.bgColors.gray]}>
                <CategoryPageFilters
                    orderingDropdown={
                        <Dropdown options={sortingOptions}
                            variant={Dropdown.variants.ordering.name}
                            onChange={changeSortingHandler}
                            value={sortingOptions.find(option => option.value === sortingParameter)}
                        />
                    }
                />

                {
                    <>
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
                    </>
                }

                <Button variants={[Button.types.grayLighter]} url={routes.home}>Home</Button>
            </Container>
        </div>
    );
};

export default TransportsPage;