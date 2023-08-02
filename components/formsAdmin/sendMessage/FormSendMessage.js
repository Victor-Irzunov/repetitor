"use client"
import { Form, Button, message, Input, Select } from 'antd'
import { sendOrderTelegram } from '@/http/telegramAPI'
import { useEffect, useState } from 'react'
import { getAllGroupTelegram } from '@/http/adminAPI'

const { Option } = Select;

const FormSendMessage = () => {
	const [form] = Form.useForm()
	const [data, setData] = useState([])

	useEffect(() => {
		getAllGroupTelegram()
			.then(data => {
				if (data.length) {
					setData(data)
				} else {
					message.warning('Групп нет')
				}
			
			})
			.catch(err => {
				console.log('err:', err)
			})
	}, [])
	const onFinish = (values) => {
		console.log('Success:', values);

		const group = data.find(g => g.id === values.group);
		let messageForm = `<b></b>\n`
		messageForm += `<b>${values.text}</b>\n`

		sendOrderTelegram({ text: messageForm, token: group.token, chat_id: group.chat_id })
			.then(data => {
				if (data.ok) {
					message.success('Сообщение для группы отправлено')
					form.resetFields()
				}
			})
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}

	return (
		<>
			<Form
				name="send_messa"
				form={form}
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label='Выберите группу'
					name="group"
					tooltip=""
					rules={[
						{
							required: true,
							message: 'Пожалуйста выберите группу!',
						},
					]}
				>
					<Select
						style={{
							width: 120,
						}}
					>
						{data.map(item => (
							<Option key={item.id} value={item.id}>
								{item.group}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label='Ваше сообщение'
					name="text"
					tooltip=""
					rules={[
						{
							required: true,
							message: 'Пожалуйста напишите сообщение!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Отправить
					</Button>
				</Form.Item>

			</Form>
		</>
	)
}

export default FormSendMessage