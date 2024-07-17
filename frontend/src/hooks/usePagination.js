import { useState, useMemo } from "react";

const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(
        () => Math.ceil(items.length / itemsPerPage),
        [items.length, itemsPerPage]
    );

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);
    const handlePageClick = (pageIndex) => {
        console.log("Changing to page:", pageIndex + 1);
        setCurrentPage(pageIndex + 1);
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        handlePageClick,
        setCurrentPage
    };
};

export default usePagination;
