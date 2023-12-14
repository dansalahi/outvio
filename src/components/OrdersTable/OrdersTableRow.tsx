import Badge from '../UI/Badge'
import { twMerge } from 'tailwind-merge'
import { OrderUtils } from "../../domain/Order/OrderUtils"
import { FC } from 'react'

interface OrderRowProps {
	id: string
	date: string
	total: number
	quantity: number
	status: string
}

export const OrderTablesRow: FC<OrderRowProps> = ({
	id,
	date,
	total,
	quantity,
	status,
}) => {

	const cellClasses =
		'text-center align-middle px-5 py-5 border-b border-gray-200 bg-white text-sm leading-none '

	const containerClasses = 'text-gray-900 whitespace-no-wrap'

	return (
		<tr className="fixed-height">
			<td className={twMerge(cellClasses)}>
				<p className={containerClasses}>{id}</p>
			</td>
			<td className={twMerge(cellClasses)}>
				<p className={containerClasses}>{OrderUtils.formatOrderDate(date)}</p>
			</td>
			<td className={twMerge(cellClasses)}>
				<p className={containerClasses}>€{total}</p>
			</td>
			<td className={twMerge(cellClasses)}>
				<p className={containerClasses}>{quantity}</p>
			</td>
			<td className={twMerge(cellClasses)}>
				<Badge
					className={`inline-block text-xs font-semibold rounded-full px-3 py-1 text-black bg-[#70707044]`}
				>
					{status}
				</Badge>
			</td>
		</tr>
	)
}