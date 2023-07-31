import {
	Form, Input,
	Button, DatePicker, message, Checkbox, Divider
} from 'antd'
import { addPayAdmin } from '@/http/adminAPI'
import moment from 'moment';
const { TextArea } = Input
const FormPayment = ({ data, handleCancel, dataPay }) => {

	const [form] = Form.useForm()
	const onFinish = async (values) => {
		console.log('values:', values)

		try {
			const formData = {
				status: values.status,
				start: moment(values.date_start.$d).format('YYYY-MM-DD'),
				end: moment(values.date_end.$d).format('YYYY-MM-DD'),
				title: values.title || '',
				userId: data[0].id,
				id: dataPay ? dataPay.id : ''
			};

			addPayAdmin(formData)
				.then(response => {
					if (response) {
						message.success(response.message);
						handleCancel()
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
			name={`add_pay_admin_${data[0].id}`}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			labelCol={{
				span: 24,
			}}
			initialValues={
				{
					status: dataPay && Object.keys(dataPay).length ? dataPay.status : false,
					title: dataPay && Object.keys(dataPay).length ? dataPay.title : ''
				}
			}
		>
			<Form.Item
				name="status"
				label="Статус оплаты"
				valuePropName="checked"
				rules={[
					{
						required: true,
						message: 'Зафиксируйте оплату!',
					},
				]}
			>
				<Checkbox>
					Оплачено
				</Checkbox>
			</Form.Item>

			{
				dataPay && Object.keys(dataPay).length ?
					<div className='mb-5'>
						<Divider className='mt-4 mb-1' />
						<p className=''>
							Дата с: {dataPay.start}
						</p>
					</div>
					:
					null
			}

			<Form.Item
				name="date_start"
				label="Выберите начальную дату оплаты"
				rules={[
					{
						required: true,
						message: 'Выберите дату оплаты!',
					},
				]}
			>
				<DatePicker />
			</Form.Item>

			{
				dataPay && Object.keys(dataPay).length ?
					<div className='mb-5'>
						<Divider className='mt-4 mb-1' />
						<p className=''>
							Дата по: {dataPay.end}
						</p>
					</div>
					:
					null
			}
			<Form.Item
				name="date_end"
				label="Выберите конечную дату оплаты"
				rules={[
					{
						required: true,
						message: 'Выберите дату оплаты!',
					},
				]}
			>
				<DatePicker />
			</Form.Item>

			<Form.Item
				name="title"
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
export default FormPayment
