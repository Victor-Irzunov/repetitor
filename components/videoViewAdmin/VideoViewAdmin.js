import { deleteOneVideoAdmin } from "@/http/adminAPI";
import { Popconfirm, message } from "antd";
import moment from "moment";

const VideoViewAdmin = ({ data }) => {

	const confirm = id => {
		deleteOneVideoAdmin(id)
			.then(data => {
				if (data) message.success(data.message)
			})
	}

	return (
		<div className="mt-14">
			{
				data.map((el) => {
					return (
						<div className="mb-16" key={el.id}>
							<h2 className="mb-4 font-light text-xs">Группа №{el.group}</h2>
							<h3 className="mb-3 font-light">Тема урока: <span className="uppercase font-semibold">{el.title}</span></h3>
							<p className="mb-3 text-sm font-light">запись урока от {moment(el.date).format("DD.MM.YYYY")}</p>
							<div className="">
								<iframe
									width="auto"
									height="auto"
									src={el.link}
									title="Запись урока"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
								/>
							</div>

							<div className="mt-8 mb-6">
								<Popconfirm
									title="Вы точно хотите удалить?"
									onConfirm={() => confirm(el.id)}
									okText="Да"
									cancelText="Нет"
								>
									<span className="text-red-500 text-xl pl-10 cursor-pointer hover:font-semibold">
										Удалить
									</span>
								</Popconfirm>
							</div>

							<hr />
						</div>
					);
				})
			}
		</div>
	)
}

export default VideoViewAdmin
