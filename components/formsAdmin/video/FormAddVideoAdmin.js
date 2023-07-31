import { Form, Input, Button, DatePicker, message } from 'antd'
import { addVideoAdmin } from '@/http/adminAPI'
const format = 'HH:mm';
const { TextArea } = Input


const FormAddVideoAdmin = () => {
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			const formData = {
				group: values.group,
				title: values.title,
				date: values.date.format('YYYY-MM-DD'),
				primechanie: values.primechanie || '',
				link: values.link || '',
			};

			addVideoAdmin(formData)
				.then(response => {
					if (response.data) {
						message.success('Видео сохранено!');
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
		<Form
			form={form}
			name='admin_add_video'
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
			<Form.Item
				name="title"
				label="Тема занятия"
				rules={[
					{
						required: true,
						message: 'Введите тему занятия!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="date"
				label="Выберите дату занятия"
				rules={[
					{
						required: true,
						message: 'Выберите дату занятия!',
					},
				]}
			>
				<DatePicker />
			</Form.Item>


			<Form.Item
				name="link"
				label="Ссылка на видео"
				rules={[
					{
						required: true,
						message: 'Ссылка на видео!',
					},
				]}
			>
				<Input
				/>
			</Form.Item>

			<Form.Item
				name="primechanie"
				label="Примечание"
			>
				<TextArea
					autoSize allowClear
				/>
			</Form.Item>


			<Form.Item>
				<Button type="primary" htmlType="submit">
					Сохранить
				</Button>
			</Form.Item>
		</Form>
	)
}
export default FormAddVideoAdmin
