"use client"
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import moment from "moment";

export const RaspisanieTable = ({ data }) => {
	const [apiData, setApiData] = useState(null);

	useEffect(() => {
		setApiData(data);
	}, [data])

	const dataSource = apiData ?
		apiData.map(item => ({
			...item,
			date: moment(item.date).format("DD.MM.YYYY"),
			time: `${item.time_from} - ${item.time_before}`,
			theme: item.title,
			primechanie: item.primechanie,
			key: item.id, 
		})) :
		[];


	const columns = [
		{
			title: 'Дата',
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Время',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Тема урока',
			dataIndex: 'theme',
			key: 'theme'
		},
		{
			title: 'Примечание',
			dataIndex: 'primechanie',
			key: 'primechanie'
		}
	];
	return (
		<div className="text-center mt-16">
			<h2 className="uppercase mb-5">
				Расписание занятий
			</h2>

			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
				scroll={{
					x: 575,
				 }}
			/>
		</div>
	)
}
