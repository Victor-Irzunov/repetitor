import { Form, Input, Button, DatePicker, message, TimePicker } from 'antd'
import { creatRaspisanie } from '@/http/adminAPI'
const format = 'HH:mm';
const { TextArea } = Input
const FormRaspisanie = () => {
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			const formData = {
				group: values.group,
				title: values.title,
				date: values.date.format('YYYY-MM-DD'),
				time_from: values.time[0].format('HH:mm'),
				time_before: values.time[1].format('HH:mm'),
				primechanie: values.primechanie || '',
			 };

			creatRaspisanie(formData)
				.then(response => {
					if (response.data) {
						message.success('Расписание создано!');
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
			name='data_add_raspisanie'
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
				name="time"
				label="Выберите время занятия"
				tooltip='С какого времени до какого времени'
				rules={[
					{
						required: true,
						message: 'Выберите время занятия!',
					},
				]}
			>
				<TimePicker.RangePicker
					minuteStep={10}
					hourStep={1}
					format={format}
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
export default FormRaspisanie
