import { Order } from '../domain/Order/OrderModel'
import { HttpService } from './HttpService'

export class OrderService extends HttpService {
	private orders: Order[] = []

	constructor() {
		super()
		this.loadOrders()
	}

	public async loadOrders() {
		const response = await OrderService.makeGet<Order[]>(
			process.env.REACT_APP_API_URL + 'orders.json'
		)
		this.orders = response.data
	}

	public getOrders(): Order[] {
		let orders= this.orders
		return orders 
	}

    public async addOrder(newOrder: Order): Promise<void> {
        // just to simulate a delay
		await OrderService.makePost('/api/orders', newOrder)
		this.orders = [newOrder, ...this.orders]
	}
}
