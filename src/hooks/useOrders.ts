import { useState, useEffect } from 'react';
import { Order } from '../domain/Order/OrderModel';
import { OrderService } from '../services/OrderService';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const orderService = new OrderService();
        const fetchOrders = async () => {
            setLoading(true);
            try {
                await orderService.loadOrders();
                setOrders(orderService.getOrders());
            } catch (error) {
                console.error(error);
            } finally {
                // make the feeling of loading for user
                setTimeout(() => setLoading(false), 1000)
            }
        };

        fetchOrders();
    }, []);

    const addOrder = (newOrder: Order) => {
        setOrders([...orders, newOrder]);
        // You might also want to handle loading state here if adding an order is async
    };
    
    return { orders, addOrder, isLoading }; // Return isLoading
};
