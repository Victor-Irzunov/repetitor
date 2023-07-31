"use client"
import { Form, Input, Button, message, Divider } from 'antd'
import { useState } from 'react';
import FormEditRaspisanie from './FormEditRaspisanie';
import { getOneUserAllRaspisanie } from '@/http/raspisanieAPI';

const FormGetRaspisanie = () => {
	const [form] = Form.useForm()
	const [data, setData] = useState({})

	const onFinish = async (values) => {
		console.log('values:', values)

		try {
			getOneUserAllRaspisanie(values.group)
				.then(response => {
					if (response.data) {
						console.log("🚀 🚀 🚀  _ file: FormGetRaspisanie.js:18 _ onFinish _ response:", response)
						message.success('Расписание получено!')
						setData(response.data)
						form.resetFields()
					} else {
						message.warning('Нет такого расписания!')
					}
				})
		} catch (error) {
			console.error('Error saving data:', error);
			message.error('Ошибка!');
		}
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}

	console.log('Object.keys(data).length: ', Object.keys(data).length)
	return (
		<>
			<Form
				form={form}
				name='data_getRaspisanie'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{
					span: 24,
				}}
			>
				<Form.Item
					name="group"
					label="Группа"
					rules={[
						{
							required: true,
							message: 'Введите номер группы!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Получить
					</Button>
				</Form.Item>
			</Form>
			
			<Divider />

			{Object.keys(data).length ? data.map(el => {
				return (
					<div className='mb-10 mt-20' key={el.id}>
						<FormEditRaspisanie data={el} setData={setData} />
						<Divider />
					</div>
				)
			})
				:
				null
			}
		</>
	)
}
export default FormGetRaspisanie
