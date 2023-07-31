"use client"
import { Form, Input, Button, message } from 'antd'
import { useState } from 'react';
import { getOneUserAdmin } from '@/http/adminAPI';
import PayListComp from '@/components/payList/PayListComp';

const FormGetOneUserPayment = () => {
	const [form] = Form.useForm()
	const [data, setData] = useState([])
	
	const onFinish = async (values) => {
		console.log('values:', values)
		const trimmedName = values.name.trim();

		try {
			getOneUserAdmin(trimmedName)
				.then(response => {
					if (response.length) {
						message.success('Данные получены!')
						setData(response)
						form.resetFields()
					} else {
						message.warning('Нет такого ученика!')
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
	return (
		<>
			<Form
				form={form}
				name='admin_get_user'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{
					span: 24,
				}}
			>
				<Form.Item
					name="name"
					label="Фамилия ученика"
					rules={[
						{
							required: true,
							message: 'Введите фамилию ученика!',
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

			{Object.keys(data).length ?
				<PayListComp data={data}/>
				:
				null
			}

		</>
	)
}
export default FormGetOneUserPayment

