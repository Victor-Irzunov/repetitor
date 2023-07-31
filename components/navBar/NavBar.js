
"use client"
import Link from 'next/link'
import {
	FileDoneOutlined,
	FormOutlined,
	CreditCardOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons'

const NavBar = () => {
	return (
		<div className='mt-10'>
			<ul>
				<li className='flex items-center mb-2'>
				<FileDoneOutlined />
					<Link href='/diary' className='ml-3'>
						Дневник
					</Link>
				</li>
				<li className='flex items-center mb-2'>
				<VideoCameraOutlined />
					<Link href='/video' className='ml-3'>
						Запись уроков
					</Link>
				</li>
				<li className='flex items-center mb-2'>
					<FormOutlined />
					<Link href='/task' className='ml-3'>
						Домашние задание
					</Link>
				</li>
				<li className='flex items-center mb-2'>
					<CreditCardOutlined />
					<Link href='/payment' className='ml-3'>
						Оплата
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default NavBar
