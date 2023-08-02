import { addGroupTelegram } from '@/http/adminAPI';
import { Form, Button, message, Input } from 'antd'

const { TextArea } = Input;

const FormAddGroupTelegram = () => {
	const [form] = Form.useForm()
	const onFinish = (values) => {
		console.log('Success:', values);

		const formData = {
			group: values.group,
			token: values.token.trim(),
			chat_id: values.chat_id.trim(),
			primechanie: values.primechanie || ''
		}
		addGroupTelegram(formData)
			.then(data => {
				if (data) {
					message.success(data.message)
					form.resetFields()
				}
			})
			.catch(err => {
				console.log('err:', err)
			})
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}
	
	return (
		<>
			<Form
				name="add_group"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				form={form}
			>
				<Form.Item
					label='Напишите название (номер) группы'
					name="group"
					tooltip="Буквы/цифры"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите здесь!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Введите токен'
					name="token"
					tooltip="Создаётся в телеграмме при помощи отца ботов @BotFather. Пример '6645910883:AAEkeCyV7n0QUJ6l-qItWQp-f7GN5nzNhgQ'"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите токен!',
						},
					]}
				>
					<Input />
				</Form.Item>


				<Form.Item
					label='Введите chat_id'
					name="chat_id"
					tooltip="Создаётся в телеграмме при помощи бота @RawDataBot, создаете группу и добавляете бота @RawDataBot потом отправляете '/id'. Пример '-906394776'"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите токен!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Примечание'
					name="primechanie"
				>
					<TextArea autoSize allowClear />
				</Form.Item>


				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
					Добавить группу
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default FormAddGroupTelegram