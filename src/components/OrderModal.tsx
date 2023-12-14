import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from './UI/Button'
import { Icon } from '@iconify/react'
import { Order } from '../domain/Order/OrderModel'
import * as yup from 'yup'
import { Dialog } from "@headlessui/react"
import { FC } from 'react'

const orderSchema = yup.object().shape({
	id: yup.string().required('Order ID is required'),
	date: yup.date().required('Order date is required'),
	total: yup
		.number()
		.positive('Order total must be a positive number')
		.required('Order total is required'),
	quantity: yup
		.number()
		.positive('Quantity must be a positive number')
		.required('Quantity is required'),
	status: yup.string().required('Status is required'),
})

const OrderModal: FC<OrderModalProps> = ({
	isOpen,
	onClose,
	onAddOrder,
}) => {
	if (!isOpen) return null

	return (
		<Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto text-sm rounded-none">
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
				<div className="relative w-full max-w-lg p-10 bg-white rounded-none border border-[#707070] shadow-lg">
				<div className="relative flex items-center justify-between mb-6">
				<Dialog.Title className="text-xl font-semibold">Add Order</Dialog.Title>
          <button onClick={onClose} className="absolute top-0 right-0">
            <Icon icon="material-symbols:close" width={20} height={20} />
          </button>
				</div>
				<Formik
					initialValues={{
						id: '',
						date: '',
						total: '',
						quantity: '',
						status: '',
					}}
					validationSchema={orderSchema}
					onSubmit={(values, { resetForm }) => {
						const orderData: Order = {
							...values,
							total: Number(values.total),
							quantity: Number(values.quantity),
						}
						onAddOrder(orderData)
						resetForm()
						onClose()
					}}
				>
					{({ isSubmitting }) => (
						<Form className="space-y-4">
							<div className="form-group">
								<label className="w-32 text-gray-700">Order ID</label>
								<div className="w-full ">
									<Field name="id" placeholder="Order ID" type="text" className="form-input" />
									<ErrorMessage
										name="id"
										component="div"
										className="text-xs text-red-500"
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="w-32 text-gray-700">Order date</label>
								<div className="w-full">
									<Field name="date" placeholder="Order date" type="date" className="form-input" />
									<ErrorMessage
										name="date"
										component="div"
										className="text-xs text-red-500"
									/>
								</div>
							</div>
							<div className="flex items-center form-group">
								<label className="w-32 text-gray-700">Order total</label>
								<div className="w-full">
									<Field name="total" placeholder="Order total" type="number" className="form-input" />
									<ErrorMessage
										name="total"
										component="div"
										className="text-xs text-red-500"
									/>
								</div>
							</div>
							<div className="flex items-center form-group">
								<label className="w-32 text-gray-700">Quantity</label>
								<div className="w-full">
									<Field name="quantity" placeholder="Quantity" type="number" className="form-input" />
									<ErrorMessage
										name="quantity"
										component="div"
										className="text-xs text-red-500"
									/>
								</div>
							</div>
							<div className="flex items-center form-group">
								<label className="w-32 text-gray-700">Status</label>
								<div className="w-full">
									<Field name="status" placeholder="Status" type="text" className="form-input" />
									<ErrorMessage
										name="status"
										component="div"
										className="text-xs text-red-500"
									/>
								</div>
							</div>
							<div className="flex items-end justify-end w-full">
								<Button
									type="submit"
									className="px-4 py-2 mt-6 text-white bg-black rounded-none w-fit"
								>
									Add order
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				</div>
				</div>
		</Dialog>
	)
}

export default OrderModal

type OrderModalProps = {
	isOpen: boolean
	onClose: () => void
	onAddOrder: (order: Order) => void
}
