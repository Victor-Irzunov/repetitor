"use client";
import { Form, Button, Input, Checkbox, message, AutoComplete } from 'antd'
import jwt_decode from "jwt-decode"
import { useContext, useState } from 'react'
import { MyContext } from '@/contexts/MyContextProvider'
import { useRouter } from "next/navigation";
import { registration } from '@/http/userAPI'


export const FormRegister = () => {
	const { updateState } = useContext(MyContext)
	const [form] = Form.useForm()
	const router = useRouter()
	const [autoCompleteResult, setAutoCompleteResult] = useState([])

	const onFinish = async (values) => {
		console.log('values:', values)

		registration(values.email, values.password, values.isAdmin, values.name, values.lastName, values.group)
			.then(response => {
				console.log('response::: ', response);
				
				message.success('Вы зарегистрированы!')
				if (response?.isAdmin) {
					message.success('Добро пожаловать Администратор!');
					router.push('/admin');
				} else {
					message.success('Вы будете перенаправлены на страницу ученика!');
					router.push('/student');
				}
					updateState(response)
					form.resetFields()
			})
			.catch(error => {
				console.log('error::: ', error);

				if (error.response.status === 401) {
					console.log(error.response.data.message);
					message.success(error.response.data.message)
				} else {
					console.log('Ошибка при регистрации:', error.message);
				}
			});
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}

	const onWebsiteChange = value => {
		if (!value) {
			setAutoCompleteResult([])
		} else {
			setAutoCompleteResult(['@gmail.com', '@tut.by', '@yandex.by', '@mail.ru'].map((domain) => `${value}${domain}`));
		}
	}
	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}))

	return (
		<>
			<Form
				name="createUser"
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
				size='large'
			>

				<Form.Item
					label="Имя"
					name="name"
					tooltip="Ваше имя, например: 'Иван'"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите Ваше имя!',
						},
					]}
				>
					<Input placeholder="" />
				</Form.Item>
				<Form.Item
					label="Фамилия"
					name="lastName"
					tooltip="Ваша фамилия, например: 'Иванов'"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите Вашу фамилию!',
						},
					]}
				>
					<Input placeholder="" />
				</Form.Item>

				<Form.Item
					label="Группа"
					name="group"
					tooltip="Ваша группа'"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите Вашу группу!',
						},
					]}
				>
					<Input placeholder="" />
				</Form.Item>



				<Form.Item
					label="Логин"
					name="email"
					tooltip="Ваша почта"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите почту!',
						},
						{
							type: 'email',
							message: 'Введите корректный email!',
						},
					]}
				>
					<AutoComplete
						options={websiteOptions}
						onChange={onWebsiteChange}
						placeholder="exemple@gmail.com"
					/>
				</Form.Item>
				<Form.Item
					label="Пароль"
					name="password"
					tooltip="минимум 4 символа"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите пароль!',
						},
					]}
				>
					<Input.Password placeholder="мин. 4 символа" />
				</Form.Item>
				<Form.Item
					name="password2"
					label="Повторите пароль"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Пожалуйста повторите пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label=""
					name="uchenik"
					valuePropName="checked"
				>
					<Checkbox >Ученик</Checkbox>
				</Form.Item>

				<Form.Item
					label=""
					name="isAdmin"
					valuePropName="checked"
				>
					<Checkbox >Админстратор</Checkbox>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Регистрация
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
