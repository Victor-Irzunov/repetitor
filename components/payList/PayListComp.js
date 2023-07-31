import { Tooltip, Button, Empty } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import ModalComp from '../modal/ModalComp';
import { useState } from 'react';

const PayListComp = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [title, setTitle] = useState('')
	const [dataPay, setDataPay] = useState({})

	const showModal = (title, data) => {
		setIsModalOpen(true);
		setTitle(title)
		setDataPay(data)
	};

	return (
		<div className=''>
			<p className='my-6 font-semibold'>
				Оплаты ученика: {data[0].name}{' '}{data[0].lastName}
			</p>
			{
				data[0].payments.length ?
					data[0].payments.map(el => {
						return (
							<div className='mb-10 bg-slate-300 p-2 rounded-lg relative' key={el.id}>
								<p>
									Оплачено: с {el.start} по {el.end}
								</p>
								<p>
									Статус: {el.status ? 'Оплачено' : 'Не оплачено'}
								</p>
								<p>
									Примечание: {el.title}
								</p>

								<div className='absolute top-1 right-1'>
									<Tooltip placement="leftTop" title="Редактировать">
										<SettingOutlined className='text-xl'
											onClick={() => showModal('Редактировать оплату', el)}
										/>
									</Tooltip>
								</div>
							</div>
						)
					})
					:
					<Empty />
			}

			<ModalComp isModalOpen={isModalOpen} data={data} dataPay={dataPay} title={title} setIsModalOpen={setIsModalOpen} />

			<div className='mt-6 text-right'>
				<Button
					type='primary'
					style={{backgroundColor: '#1677ff'}}
					onClick={()=>showModal('Зафиксировать оплату')}
				>
					+ Добавить
				</Button>
			</div>
		</div>
	)
}

export default PayListComp