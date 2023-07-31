"use client"
import {
	Form, Input,
	Button, DatePicker,
	message, TimePicker, Divider,
	Popconfirm,
} from 'antd'
import { deleteRaspisanie, editRaspisanie } from '@/http/adminAPI'
import { useEffect, useState } from 'react';
const format = 'HH:mm';
const { TextArea } = Input

const FormEditRaspisanie = ({ data, setData }) => {
	const [form] = Form.useForm()
	const [reversedDate, setReversedDate] = useState(null)

	const reverseDate = (date) => {
		if (!date) return '';
		const [year, month, day] = date.split('-');
		return `${day}.${month}.${year}`;
	};

	useEffect(() => {
		setReversedDate(reverseDate(data.date));
	}, [data.date]);

	const onFinish = async (values) => {
		console.log('values:', values)
		try {
			const formData = {
				group: values.group,
				title: values.title,
				date: values.date ? values.date.format('YYYY-MM-DD') : data.date,
				time_from: values.time[0].format('HH:mm'),
				time_before: values.time[1].format('HH:mm'),
				primechanie: values.primechanie || '',
				id: data.id
			};

			editRaspisanie(formData)
				.then(response => {
					if (response.data) {
						message.success('Расписание обновлено!');
						form.resetFields()
						setData({})
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

	const confirm = () => {
		deleteRaspisanie(data.id)
			.then(data => {
				if (data) {
					message.success('Удалено!')
					form.resetFields()
					setData({})
				} else {
					message.error('Ошибка!')
				}
			})
	}

	return (
		<>
			<Form
				form={form}
				name={`edetRaspisanie_${data.id}`}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				labelCol={{
					span: 24,
				}}
				initialValues={{
					group: data.group,
					title: data.title,
					primechanie: data.primechanie
				}}
			>
				<Form.Item
					name="group"
					label="Группа"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Введите номер группы!',
				// 	},
				// ]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="title"
					label="Тема занятия"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Введите тему занятия!',
				// 	},
				// ]}
				>
					<Input />
				</Form.Item>
				<Divider />
				<div className='mt-4 mb-2'>
					<p className=''>{reversedDate}</p>
				</div>
				<Form.Item
					name="date"
					label="Выберите новую дату занятия"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Выберите дату занятия!',
				// 	},
				// ]}
				>
					<DatePicker />
				</Form.Item>
				<Divider />

				<div className='mt-4 mb-2'>
					<p className=''>
						{data.time_before} - {data.time_from}
					</p>
				</div>

				<Form.Item
					name="time"
					label="Выберите время занятия"
					tooltip=''
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
						Изменить
					</Button>
				</Form.Item>
			</Form>

			<div className='text-right'>
				<Popconfirm
					title="Вы точно хотите удалить?"
					onConfirm={confirm}
					okText="Да"
					cancelText="Нет"
				>
					<Button type='text' danger>
						Удалить
					</Button>
				</Popconfirm>
			</div>
		</>
	)
}
export default FormEditRaspisanie
