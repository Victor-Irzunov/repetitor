"use client"
import Image from "next/image";
import fon from "../../public/images/fonStudent.webp";
import NavBar from "@/components/navBar/NavBar";
import { RaspisanieTable } from "@/components/tableRaspisanie/RaspisanieTable";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/contexts/MyContextProvider";
import { dataUser } from "@/http/userAPI";
import { getOneUserAllRaspisanie } from "@/http/raspisanieAPI";
import { message } from "antd";

const StudentPage = ({ userData }) => {
	const { state, updateState } = useContext(MyContext)
	const [data, setData] = useState([])

	useEffect(() => {
		if (!Object.keys(state).length) {
			dataUser()
				.then(data => {
					updateState(data)
					if (data) {
						getOneUserAllRaspisanie(data.group)
							.then(data => {
								message.success(data.message)
								console.log("🚀 🚀 🚀  _ file: page.js:23 _ useEffect _ data:", data)
								if (Array.isArray(data.data)) {
									setData(data.data)
								} else {
									const dataArr = []
									dataArr.push(data.data)
									setData(dataArr)
								}
							})
					}
				})
		}
	}, [])

	return (
		<section className="py-16 min-h-screen relative">
			<div className="container mx-auto">
				<h1 className="text-center uppercase text-3xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
					Страница ученика
				</h1>
				{
					state && Object.keys(state).length ?
						<p className="mt-7 text-center">
							{state.name}{' '}{state.lastName}
						</p>
						:
						null
				}
				<div className="w-full">
					<NavBar />
					{
						data && data.length ? <RaspisanieTable data={data} /> : null
					}


					<div className="text-center w-full mt-20">
						<Image src={fon} alt="ученик" width="180" className="mx-auto" />
					</div>
				</div>
			</div>
		</section>
	);
};
export default StudentPage;
