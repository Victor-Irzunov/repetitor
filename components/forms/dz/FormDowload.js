"use client"
import { useState } from 'react'
import { Form, Input, Button, Upload, message, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { dataDzStudent } from '@/http/dataDzAPI'
import Resizer from "react-image-file-resizer"

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
const { TextArea } = Input

const FormDowload = ({ data, dataDz }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append('primechanie', values.primechanie || '');
			formData.append('id', data?.id);
			formData.append('title', dataDz.title || '');
			formData.append('num', values.num);
			if (values.img && values.img.length > 0) {
				for (let k in values.img) {
					const pic = await resizeFile(values.img[k].originFileObj, 1300, 700);
					formData.append('img', pic);
				}
			}
			dataDzStudent(formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then(response => {
					if (response) {
						message.success('Домашнее задание успешно отправлено!');
						form.resetFields()
						setTimeout(() => {
							notification.success({
								message: 'Успех!',
								description: 'Ваше домашнее задание получено!',
								duration: 5,
							});
						}, 1000)
					}
				})
		} catch (error) {
			console.error('Error saving data:', error);
			message.error('Ошибка в отправке ДЗ!');
		} finally {
			setLoading(false);
		}
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}


	return (
		<>
			<Form
				form={form}
				name='data__user_dz'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 2,
				}}
			>
				<Form.Item
					name="num"
					label="Номер домашнего задания"
				>
					<Input style={{ width: '100px' }} />
				</Form.Item>

				<Form.Item
					name="img"
					label="Загрузить изображение"
					valuePropName="fileList"
					getValueFromEvent={(e) => e.fileList}
					rules={[{ required: true, message: 'Пожалуйста загрузите фото домашнего задания' }]}
				>
					<Upload
						name="img"
						accept="image/*"
						beforeUpload={() => false}
					>
						<Button icon={<UploadOutlined />}>Загрузить</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					name="primechanie"
					label="Примечание к Домашнему заданию"
				>
					<TextArea
						autoSize allowClear
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Отправить
					</Button>
				</Form.Item>
			</Form>
		</>
	)

}

export default FormDowload
