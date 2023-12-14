import { FC } from 'react'
import OrdersTable from './components/OrdersTable/OrdersTable'
import './styles/global.css'

const App: FC = () => {
	return (
		<div className="flex justify-center min-h-screen p-8 pt-5 font-sans bg-gray-100 lg:h-screen">
			<OrdersTable />
		</div>
	)
}

export default App
