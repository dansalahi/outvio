import { useState, useEffect, useRef } from 'react';

export const useFilter = <T,>(items: T[], query: string, filterFunction: (item: T, query: string) => boolean) => {
    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const handlerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // debounce
        clearTimeout(handlerRef.current);
        const timeout = setTimeout(() => {
            if (!query) {
                setFilteredItems(items);
                return;
            }
            setFilteredItems(items.filter(item => filterFunction(item, query)));
        }, 300);
        handlerRef.current = timeout;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, query, filterFunction]);

    return filteredItems;
};
