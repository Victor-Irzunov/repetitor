"use client"
import Image from 'next/image';
import { Divider, Empty, Image as Img, message } from 'antd';
import fon from '../../public/images/fon_dz.webp'
import { DownloadOutlined } from '@ant-design/icons';
import FormDowload from '@/components/forms/dz/FormDowload';
import { MyContext } from '@/contexts/MyContextProvider';
import { useContext, useEffect, useState } from 'react';
import { dataUser } from '@/http/userAPI';
import { getDzStudent } from '@/http/dataDzAPI';


const TaskPage = () => {
	const [data, setData] = useState({});
	const [dataDz, setDataDz] = useState({});
	const [userDataReceived, setUserDataReceived] = useState(false);
	const { updateState } = useContext(MyContext);

	useEffect(() => {
		dataUser()
			.then(res => {
				if (res && !res?.isAdmin) {
					updateState(res);
					setData(res);
					setUserDataReceived(true);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (userDataReceived && data.group) {
			getDzStudent(data.group)
				.then(data => {
					message.success(data.message);
					setDataDz(data.data);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [userDataReceived, data.group]);

	return (
		<section className="py-16 min-h-screen">
			<div className="container mx-auto text-center">
				<h1 className="text-center uppercase  text-3xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
					Домашнее задание
				</h1>
				<p className='mt-5'>
					Группа {data.group}
				</p>
				<div className='w-full mt-12'>
					{
						dataDz && Object.keys(dataDz).length ?
							<div
								className='text-center bg-gray-100 mb-7 py-3 rounded-lg'
							>
								<p className='mb-3'>
									Домашнее занятие номер: {dataDz.lesson}
								</p>
								<p className='mb-3'>
									Тема: <span className='font-semibold'>{dataDz.title}</span>
								</p>
								{
									JSON.parse(dataDz.img).map((el, idx) => {
										return (
											<div className='mb-8' key={el.image}>
												<Img src={`/uploads/${el.image}`}
													width={300}
													height='auto'
													alt='домашнее задание'
													priority="true"
													className='mx-auto'
												/>
												<div className='mt-5'>
													<a
														href={`/uploads/${el.image}`}
														download
														className="mx-auto bg-blue-300 py-1 inline-flex px-2  items-center rounded-md"
													>
														<DownloadOutlined className='mr-2' />
														скачать
													</a>
												</div>
												<Divider className={`${idx === 0 ? 'blok' : 'hidden'}`} />
											</div>
										)
									})
								}
								{
									dataDz ?
										<p className='text-gray-500 text-sm'>
											Примечание: {dataDz.primechanie}
										</p>
										:
										null
								}

							</div>
							:
							<Empty description='Пока нет домашнего задания' />
					}
				</div>
				<Divider className='py-10' />
				{
					Object.keys(data).length ?
						<div className=''>
							<p className='mb-5'>
								Отправьте на проверку преподавателю ваше домашнее задание
							</p>

							<FormDowload data={data} dataDz={dataDz} />
						</div>
						:
						null
				}
				<Divider className='py-10' />
				<div className="float-right mt-20">
					<Image src={fon} alt="Дневник ученика" priority='true' width={180} height='auto' className="" />
				</div>
			</div>
		</section>
	)
}

export default TaskPage;
