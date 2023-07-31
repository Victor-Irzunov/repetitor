// server/api/raspisanie.js
const { Video } = require('../../models/models');

const videoAddAdmin = async (req, res) => {
	if (req.method === 'POST') {
		try {
			// Получаем данные из тела запроса
			const { group, title, date, link, primechanie } = req.body;

			// Создаем новую запись в базе данных
			const newVideo = await Video.create({
				group,
				title,
				date,
				link,
				primechanie
			});

			// Возвращаем успешный ответ
			res.status(201).json({ message: 'Видео добавлено успешно', data: newVideo });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		// Возвращаем ошибку, если метод запроса не POST
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};



module.exports = { videoAddAdmin };
