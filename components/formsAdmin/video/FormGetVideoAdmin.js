import { Form, Input, Button, message, Empty } from 'antd'
import { getVideoGroup } from '@/http/videoAPI'
import { useState } from 'react'
import VideoViewAdmin from '@/components/videoViewAdmin/VideoViewAdmin'

const FormGetVideoAdmin = () => {
	const [form] = Form.useForm()
	const [data, setData] = useState([])

	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			getVideoGroup(values.group)
				.then(response => {
					form.resetFields()
					if (response.data.length) {
						message.success(response.message)
						setData(response.data)
					} else {
						message.warning('Записей нет!')
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
				name='admin_get_video'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{
					span: 24,
				}}
			>
				<Form.Item
					name="group"
					label="Введите номер группы"
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

			{
				data.length ?
					<VideoViewAdmin data={data} />
					:
					<Empty />
			}
		</>
	)
}
export default FormGetVideoAdmin
