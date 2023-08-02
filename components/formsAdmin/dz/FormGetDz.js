"use client"
import { Form, Input, Button, message } from 'antd'
import { useState } from 'react';
import { getAllAdminDzStudents } from '@/http/dataDzAPI';
import ViewDzAllStudets from '@/components/adminComp/ViewDzAllStudets';

const FormGetDz = () => {
	const [form] = Form.useForm()
	const [data, setData] = useState({})
	const [group, setGroup] = useState('')

	const onFinish = async (values) => {
		console.log('values:', values)
		setGroup(values.group)

		try {
			getAllAdminDzStudents(values.group)
				.then(response => {
					if (response.data.length) {
						message.success('Домашние задания получены!')
						setData(response.data)
						form.resetFields()
					} else {
						message.warning('Нет ДЗ!')
						form.resetFields()
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
				name='dz_get'
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

			{Object.keys(data).length ?
				<ViewDzAllStudets data={data} setData={setData} group={group} />
				:
				null
			}
		</>
	)
}
export default FormGetDz

