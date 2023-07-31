const { Dnevnik } = require('../../models/models');

const ocenkaAdminDnevnik = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { dz_num, title, ocenka, primechanie, userId } = req.body

			const data = await Dnevnik.create({ dz_num, title, ocenka, primechanie, userId })

			res.status(200).json({ message: 'Домашние задания получены!' });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Произошла ошибка при запросе' });
		}
	} else {
		res.status(405).json({ error: 'Метод не разрешен' });
	}
};

module.exports = { ocenkaAdminDnevnik };
