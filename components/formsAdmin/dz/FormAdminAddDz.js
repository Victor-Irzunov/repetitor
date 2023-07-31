import { Form, Input, Button, Upload, message, InputNumber } from 'antd'
import { addAdminDz } from '@/http/adminAPI'
import { UploadOutlined } from '@ant-design/icons'
import Resizer from "react-image-file-resizer"
const { TextArea } = Input
const resizeFile = (file, size, size2) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			size,
			size2,
			"WEBP",
			70,
			0,
			(uri) => {
				resolve(uri)
			},
			"file"
		)
	})
const FormAdminAddDz = () => {
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			const formData = new FormData();
			formData.append('group', values.group);
			formData.append('lesson', values.lesson);
			formData.append('title', values.title);
			formData.append('primechanie', values.primechanie);
			if (values.img && values.img.length > 0) {
				for (let k in values.img) {
					const pic = await resizeFile(values.img[k].originFileObj, 1300, 700);
					formData.append('img', pic);
				}
			}
			addAdminDz(formData)
				.then(response => {
					if (response) {
						message.success('ДЗ добавлено!');
						form.resetFields();
					}
				});
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
			name='data_add_dz'
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
				name="lesson"
				label="Номер ДЗ"
			>
				<InputNumber />
			</Form.Item>
			<Form.Item
				name="title"
				label="Название ДЗ"
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="img"
				label="Загрузите изображение"
				rules={[
					{
						required: true,
						message: 'Загрузите изображение!',
					},
				]}
				valuePropName="fileList"
				getValueFromEvent={(e) => e.fileList}
			>
				<Upload
					name="img"
					accept="image/*"
					multiple={true}
					beforeUpload={() => false}
				>
					<Button icon={<UploadOutlined />}>Загрузить</Button>
				</Upload>
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
export default FormAdminAddDz
