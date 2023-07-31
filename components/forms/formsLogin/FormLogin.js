"use client";
import { useRouter } from "next/navigation";
import { useState, useContext } from 'react';
import { Form, Input, message, Button, AutoComplete } from 'antd';
import { login } from "@/http/userAPI";
import { MyContext } from "@/contexts/MyContextProvider";
import jwt_decode from "jwt-decode"


const FormLogin = ({ fromPage }) => {
	const { updateState } = useContext(MyContext);
	const [form] = Form.useForm();
	const [isCheck, setIsCheck] = useState(false);
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [autoCompleteResult, setAutoCompleteResult] = useState([]);
	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult(
				['@gmail.com', '@tut.by', '@yandex.by', '@mail.ru'].map((domain) => `${value}${domain}`));
		}
	};
	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}));
	let count = 0;

	const onFinish = (values) => {
		if (count > 0) {
			login(values.email, values.password)
				.then((res) => {
					updateState(res)
					if (res?.isAdmin) {
						message.success('Здравствуйте Администратор!');
						router.push('/admin');
					} else {
						message.success('Личность подтверждена!');
						router.push('/student');
					}
					form.resetFields()
				})
				.catch((error) => {
					if (error.response) message.error(error.response.data.message);
				});
		}
		count++;
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const onFinishFailed = (errorInfo) => message.error('Ошибка');
	const onChange = (e) => {
		setIsCheck(e.target.checked);
	};
	return (
		<>
			<Form
				layout="vertical"
				name="logIn"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				style={{ overflowX: 'hidden' }}
				size='large'
			>
				<Form.Item
					label="Логин"
					name="email"
					tooltip="Обязательное поле"
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
					<AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="exemple@gmail.com" />
				</Form.Item>
				<Form.Item
					label="Пароль"
					name="password"
					tooltip="Обязательное поле"
					hasFeedback
					size="large"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите пароль!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<div className="flex justify-between">
					<Form.Item>
						<Button type="primary" htmlType="submit" onClick={onFinish} size="large">
							Войти
						</Button>
					</Form.Item>
					{/* <Button
						type="text"
						className="text-xs font-light text-gray-700"
						onClick={() => {
							showModal();
							handleCancel();
						}}
						style={{ backgroundColor: 'transparent' }}
					>
						Забыли пароль?
					</Button> */}
				</div>
			</Form>
		</>
	);
};
export { FormLogin }
