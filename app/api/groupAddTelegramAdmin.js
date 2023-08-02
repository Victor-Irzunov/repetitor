const { Group_telegram } = require('../../models/models');

const addGroupTeleg = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { group, chat_id, token, primechanie } = req.body

			const data = await Group_telegram.create({ group, chat_id, token, primechanie})

			res.status(200).json({ message: 'Группа добалена!' });
		} catch (error) {
			
			console.error('Error:', error);
			res.status(500).json({ error: 'Произошла ошибка при запросе' });
		}
	} else {
		res.status(405).json({ error: 'Метод не разрешен' });
	}
};

module.exports = { addGroupTeleg };
