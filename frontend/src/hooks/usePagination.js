import { useState } from "react";

const usePagination = () => {
    const [pagination, setPagination] = useState({});
    const currentPage = pagination.page || 1;


    const setPaginationData = (data) => {
        setPagination(data);
    };


    return { currentPage, pagination, setPaginationData };
};

export default usePagination;
