"use client"
import { Table } from 'antd';
import moment from 'moment';

export const DiaryTable = ({ dataDnevnik }) => {
  // console.log("🚀 🚀 🚀  _ file: DiaryTable.js:6 _ DiaryTable _ dataDnevnik:", dataDnevnik)
  // Преобразовываем массив данных в массив объектов для dataSource
  const dataSource = dataDnevnik.map((item) => ({
    key: item.id,
    date: moment(item.createdAt).format('DD.MM.YYYY'),
    title: item.title,
    dz_num: item.dz_num,
    ocenka: item.ocenka,
    primechanie: <span className='text-xs text-gray-500'>{item.primechanie || ''}</span>,
  }));

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Тема',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Номер ДЗ',
      dataIndex: 'dz_num',
      key: 'dz_num',
    },
    {
      title: 'Оценка',
      dataIndex: 'ocenka',
      key: 'ocenka',
    },
    {
      title: 'Примечание',
      dataIndex: 'primechanie',
      key: 'primechanie',
    },
  ];

  return (
    <div className="text-center mt-16">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{
          x: 300,
        }}
      />
    </div>
  );
};
