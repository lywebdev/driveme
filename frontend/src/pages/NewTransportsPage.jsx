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

const TransportsPage = () => {
    const [transports, setTransports, pagination, setIsLoading] = useTransportsStore(state => [
        state.transports,
        state.setTransports,
        state.pagination,
        state.setIsLoading,
    ]);
    const [sorting, setSorting] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const urlLocation = useLocation();
    const params = new URLSearchParams(urlLocation.search);

    const page = params.get('page');
    const paramsSorting = params.get('sort_order');

    const sortingOptions = [
        {value: null, label: "None"},
        {value: 'desc', label: "Descending"},
        {value: 'asc', label: "Ascending"},
    ];

    const locationOptions = [
    ];

    const changeSortingHandler = (selectedOption) => {
        const value = selectedOption.value;
        const params = new URLSearchParams(urlLocation.search);

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
        console.log(selectedOption);
    };

    const getPaginationBtnPath = (pageNumber) => {
        const currentPageNumber = pageNumber || 1;

        params.set('page', `${currentPageNumber}`);

        return `${urlLocation.pathname}?${params.toString()}`;
    };


    useEffect(() => {
        const fetchTransports = async () => {
            setIsLoading(true);
            const queryParams = {
                page: searchParams.get('page') || null,
                price_order: searchParams.get('price_order') || null,
                order: searchParams.get('sort_order') || null,
                price_from: searchParams.get('price_from') || null,
                price_to: searchParams.get('price_to') || null,
            };

            const response = await TransportService.findAll({queryParams});

            if (response.data.isSuccess) {
                return response.data.data;
            }
        };

        let responseData = {};
        fetchTransports()
            .then((content) => {
                responseData = content;
                return null;
            }).finally(() => {
                setTransports(responseData.items, responseData.pagination);
                setIsLoading(false);
            });
    }, [page, sorting]);


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
                    orderingDropdown={
                        <Dropdown options={sortingOptions}
                            variant={Dropdown.variants.ordering.name}
                            onChange={changeSortingHandler}
                            value={sortingOptions.find(option => option.value === paramsSorting)}
                        />
                    }
                />

                {
                    <>
                        <TransportsContainer
                            transports={transports}
                            marginTop
                            className='main-container'
                            totalItems={pagination.totalItems}
                            perPage={pagination.perPage}
                        />
                        <Pagination
                            className='pagination'
                            totalPages={pagination.totalPages}
                            currentPage={pagination.page}
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