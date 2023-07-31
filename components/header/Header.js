"use client"
import { HomeOutlined } from '@ant-design/icons'
import Link from 'next/link'

export const Header = () => {
	return (
		<header className="py-5">
			<nav className="container mx-auto">
				<Link href='/student'>
					<HomeOutlined />
				</Link>
			</nav>
		</header>
	)
}
