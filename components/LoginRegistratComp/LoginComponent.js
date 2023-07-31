"use client"
import { useState } from 'react'
import { Button } from 'antd'
import { FormLogin } from '../forms/formsLogin/FormLogin'
import { FormRegister } from '../forms/formsLogin/FormRegister'
import { useScreens } from '@/Constants/constants'

const LoginComponent = () => {
	const [isAccount, setIsAccount] = useState(false)
	const screens = useScreens()

	return (
		<div
			className='mx-auto z-30 pt-11 pb-10'
		>
			{
				!isAccount &&
				<>
					<h6 className='mb-3 text-center font-semibold'
					>Для доступа в Ваш личный кабинет введите e-mail.
					</h6>
					<FormLogin />
					<span className='text-sm mr-2'>Нет аккаунта?</span>
					<span
						className='font-semibold ml-2 cursor-pointer'
						onClick={() => {
							setIsAccount(true)
						}}
					>
						Зарегистрироваться
					</span>
				</>
			}
			{
				isAccount &&
				<>
					<h6 className='mb-3 text-center font-semibold'>Регистрация</h6>
					<FormRegister />
					<span className='text-sm mr-2'>
						Есть аккаунт?
					</span>
					<span
						className='font-semibold ml-2 cursor-pointer'
						onClick={() => {
							setIsAccount(false)
						}}>
						Вход
					</span>
				</>
			}
		</div>
	)
}
export { LoginComponent }