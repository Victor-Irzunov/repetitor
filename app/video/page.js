"use client"
import { dataUser } from "@/http/userAPI";
import { getVideoGroup } from "@/http/videoAPI";
import { Empty, message } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";


const VideoPage = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		dataUser()
			.then((res) => {
				if (res && res.group) {
					getVideoGroup(res.group)
						.then((data) => {
							if (data) {
								message.success(data.message)
								setData(data.data);
							}
						})
						.catch((error) => {
							console.error("Error fetching video data:", error);
						});
				}
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, []);

	return (
		<section className="">
			<div className="container mx-auto">
				<h1 className="text-center uppercase text-3xl font-semibold bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text mb-20">
					Запись уроков
				</h1>

				{data.length ? data.map((el) => {
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
							{el.primechanie
								?
								<p className="mt-5 text-gray-500 text-sm">
									Примечание: {el.primechanie}
								</p>
								:
								null
							}

						</div>
					);
				})
					:
					<Empty />
				}
			</div>
		</section>
	);
};

export default VideoPage;
