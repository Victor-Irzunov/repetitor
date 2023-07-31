"use client"
import { Form, Input, Button, message } from 'antd'
import { dnevnikAdmin } from '@/http/adminAPI';

const FormAdminDnevnik = ({ data, setActiveForm }) => {
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			const formData = {
				dz_num: data.num,
				title: data.title,
				ocenka: values.ocenka,
				primechanie: values.primechanie || '',
				userId: data.user.id
			 };
			 dnevnikAdmin(formData)
				.then(response => {
					if (response) {
						message.success('Оценка сохранена!')
						form.resetFields()
						setActiveForm(i=>!i)
					} else {
						message.warning('Ошибка!')
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
				name={`dnevnik_admin_${data.user.id}`}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{
					span: 24,
				}}
			>
				<Form.Item
					name="ocenka"
					label="Оценка"
					rules={[
						{
							required: true,
							message: 'Ваша оценка!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="primechanie"
					label="Примечание к оценке за ДЗ"
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Сохранить
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
export default FormAdminDnevnik

