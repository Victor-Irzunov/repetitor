const { StudentDz, User } = require('../../models/models');

const getAllDzUsers = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { group } = req.query;
			const users = await User.findAll({ where: { group } });

			if (!users || users.length === 0) {
				return res.status(404).json({ message: 'Пользователи не найдены' });
			}

			const data = await Promise.all(users.map(async (user) => {
				const oneDz = await StudentDz.findOne({
					where: { userId: user.id },
					include: [{ model: User }],
				});
				return oneDz;
			}));

			// Filter out null elements from the data array
			const filteredData = data.filter(item => item !== null);

			res.status(200).json({ message: 'Домашние задания получены!', data: filteredData });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Произошла ошибка при запросе' });
		}
	} else {
		res.status(405).json({ error: 'Метод не разрешен' });
	}
};

module.exports = { getAllDzUsers };
