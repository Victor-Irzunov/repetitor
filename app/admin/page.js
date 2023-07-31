"use client"

import { Collapse } from "antd"
import {
	ScheduleOutlined, FormOutlined,
	CalculatorOutlined, AuditOutlined, VideoCameraAddOutlined, 
	VideoCameraOutlined, DollarOutlined, 
} from '@ant-design/icons'
import FormRaspisanie from "@/components/formsAdmin/raspisanie/FormRaspisanie"
import FormGetRaspisanie from "@/components/formsAdmin/raspisanie/FormGetRaspisanie"
import FormAdminAddDz from "@/components/formsAdmin/dz/FormAdminAddDz"
import FormGetDz from "@/components/formsAdmin/dz/FormGetDz"
import FormAddVideoAdmin from "@/components/formsAdmin/video/FormAddVideoAdmin"
import FormGetVideoAdmin from "@/components/formsAdmin/video/FormGetVideoAdmin"
import FormGetOneUserPayment from "@/components/formsAdmin/payment/FormGetOneUserPayment"

const items = [
	{
		key: '1',
		label: 'Добавить расписание',
		children: <FormRaspisanie />,
		extra: <ScheduleOutlined className='text-xl text-rose-600 ml-1' />,
	},
	{
		key: '2',
		label: 'Изменить / Удалить расписание',
		children: <FormGetRaspisanie />,
		extra: <FormOutlined className='text-xl text-rose-600 ml-1' />,
	},
];
const items2 = [
	{
		key: '1',
		label: 'Добавить домашнее задание',
		children: <FormAdminAddDz />,
		extra: <CalculatorOutlined className='text-xl text-green-600 ml-1' />,
	},
	{
		key: '2',
		label: 'Проверить домашние задания',
		children: <FormGetDz />,
		extra: <AuditOutlined className='text-xl text-orange-600 ml-1' />,
	},
];

const items3 = [
	{
		key: '1',
		label: 'Добавить видео урока',
		children: <FormAddVideoAdmin />,
		extra: <VideoCameraAddOutlined className='text-xl text-blue-600 ml-1' />,
	},
	{
		key: '2',
		label: 'Удалить видео',
		children: <FormGetVideoAdmin />,
		extra: <VideoCameraOutlined className='text-xl text-red-600 ml-1' />,
	},
];

const items4 = [
	{
		key: '1',
		label: 'Добавить оплату',
		children: <FormGetOneUserPayment />,
		extra: <DollarOutlined className='text-xl text-purple-600 ml-1' />,
	},
	
];

const AdminPage = () => {
	return (
		<section className="pt-6">

			<div className="container mx-auto">
				<h1 className="text-center text-xl uppercase">
					Административная панель
				</h1>

				<div className="mt-10">
					<Collapse items={items} accordion className="mb-6" />

					<Collapse items={items2} accordion className="mb-6" />
					
					<Collapse items={items3} accordion className="mb-6" />
					
					<Collapse items={items4} accordion className="mb-6"  />
				</div>
			</div>
		</section>
	)
}
export default AdminPage