import { useEffect, useState } from 'react'
import { Order } from '../domain/Order/OrderModel'

type SortOrder = 'asc' | 'desc' | 'none'
export type SortField = keyof Order | ''

export const useSort = (initialOrders: Order[]) => {
	const [sortedOrders, setSortedOrders] = useState<Order[]>(initialOrders)
	const [sortState, setSortState] = useState<{
		field: SortField
		order: SortOrder
	}>({ field: '', order: 'none' })

	const sortOrders = (field: SortField) => {
        let newOrder: SortOrder = 'asc';
        if (field === sortState.field) {
            // Toggle between 'asc' and 'desc'. If already 'desc', set to 'none'
            newOrder = sortState.order === 'asc' ? 'desc' : (sortState.order === 'desc' ? 'none' : 'asc');
        }
        setSortState({ field, order: newOrder });

        if (newOrder === 'none') {
            setSortedOrders(initialOrders);
            return;
        }

        const compare = (a: Order, b: Order) => {
            //@ts-ignore
            let aValue = a[field];
            //@ts-ignore
            let bValue = b[field];

            // Handling numeric fields
            if (field === 'id' || field === 'quantity' || field === 'total') {
                aValue = Number(aValue);
                bValue = Number(bValue);
            }
            // Handling date fields
            else if (field === 'date') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            // Sorting logic
            if (aValue < bValue) return newOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return newOrder === 'asc' ? 1 : -1;
            return 0;
        };

        const sorted = [...initialOrders].sort(compare);
        setSortedOrders(sorted);
    };

	const getSortIcon = (field: SortField): string => {
		if (sortState.field === field) {
			return sortState.order === 'asc'
				? 'iconamoon:arrow-up-2'
				: sortState.order === 'desc'
				? 'mdi:chevron-down'
				: 'mdi:unfold-more-horizontal'
		}
		return 'mdi:unfold-more-horizontal'
	}

    useEffect(() => {
        setSortedOrders(initialOrders)
    }, [initialOrders])

	return { sortedOrders, sortOrders, getSortIcon }
}
