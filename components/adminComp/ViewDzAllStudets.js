import { Button, Divider, Empty, Image, Popconfirm, message } from "antd";
import FormAdminDnevnik from "../formsAdmin/dnevnik/FormAdminDnevnik";
import { useEffect, useState } from "react";
import { dataDnevnik } from "@/http/dnevnikAPI";
import { deleteAdminDzOneUser } from "@/http/adminAPI";

const ViewDzAllStudets = ({ data, group }) => {
  console.log("🚀 🚀 🚀   data:", data)
  const [activeForm, setActiveForm] = useState(false);
  const [dataDnev, setDataDnev] = useState([]);

  useEffect(() => {
    dataDnevnik(group)
      .then(data => {
        setDataDnev(data.data)
      })
  }, [activeForm])

  const isAssignmentEvaluated = (userId, dzNum) => {
    return dataDnev.some((item) => item.userId === userId && item.dz_num === dzNum);
  };


  const confirm = (id) => {
    deleteAdminDzOneUser(id)
      .then(data => {
        console.log("🚀 🚀 🚀  _ file: ViewDzAllStudets.js:27 _ confirm _ data:", data)
        if (data) {
          message.success('Удалено!')
          form.resetFields()
          // setData({})
        } else {
          message.error('Ошибка!')
        }
      })
  }


  return (
    <div className="">
      <p className="text-center text-lg font-semibold">
        Группа № {group}
      </p>
      {data.length ? data.map(el => {
        return (
          <div className="mb-20" key={el.id}>
            <div className="">
              <p className="">
                Номер ДЗ: {el.num}
              </p>
              <p className="">
                Ученик: {el.user.name}{' '}{el.user.lastName}
              </p>
              <p className={`${el.primechanie ? 'block' : 'hidden'}`}>
                Примечание: {el.primechanie}
              </p>
              {JSON.parse(el.img).map((elem, idx) => {
                return (
                  <div className='mb-8 mt-10' key={elem.image}>
                    <Image
                      src={`/uploads/${elem.image}`}
                      width={300}
                      height='auto'
                      alt='домашнее задание'
                      className='mx-auto'
                    />
                    <div className='mt-5'>
                      <a
                        href={`/uploads/${elem.image}`}
                        download
                        className="mx-auto bg-blue-300 py-1 inline-flex px-2  items-center rounded-md"
                      >
                        скачать
                      </a>
                    </div>
                  </div>
                )
              })}

              {isAssignmentEvaluated(el.user.id, el.num) ? (
                <div className="flex justify-between items-center">
                  <p>Это задание проверено.</p>
                  <Popconfirm
                    title="Вы точно хотите удалить?"
                    onConfirm={() => confirm(el.id)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button
                      type="text"
                      danger
                    >
                      Удалить
                    </Button>
                  </Popconfirm>
                </div>
              ) : (
                <div className="mt-10">
                  <FormAdminDnevnik
                    data={el}
                    setActiveForm={setActiveForm}
                  />
                </div>
              )}
            </div>
            <Divider />
          </div>
        )
      }) : <Empty />}
    </div>
  );
};

export default ViewDzAllStudets;
