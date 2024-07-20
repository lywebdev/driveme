import { useState, useMemo } from "react";

const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = useMemo(() => {
        return Array.isArray(items) ? items.length : 0;
    }, [items]);

    const totalPages = useMemo(() => {
        if (!Array.isArray(items) || itemsPerPage <= 0) return 0;
        return Math.ceil(totalItems / itemsPerPage);
    }, [items, itemsPerPage, totalItems]);

    const currentItems = useMemo(() => {
        if (!Array.isArray(items) || itemsPerPage <= 0) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const handlePageClick = (pageIndex) => {
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        console.log("Changing to page:", pageIndex + 1);
        setCurrentPage(pageIndex + 1);
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        totalItems,
        handlePageClick,
        setCurrentPage
    };
};

export default usePagination;
