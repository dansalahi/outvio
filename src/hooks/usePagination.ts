import { useState, useMemo, useEffect } from 'react';

export const usePagination = <T,>(items: T[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, items, itemsPerPage]);

    // if current page is bigger than the max page, set current page to max page
    useEffect(() => {
        if (currentPage > maxPage && maxPage !== 0) setCurrentPage(maxPage);
    }, [currentPage, maxPage]);

    return { paginatedItems, currentPage, setCurrentPage, maxPage };
};
