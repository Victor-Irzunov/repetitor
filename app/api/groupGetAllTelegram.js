const { Group_telegram } = require('../../models/models');

const allGroupTelegram = async (req, res) => {

	if (req.method === 'GET') {
		try {
			const data = await Group_telegram.findAll();

			res.status(201).json(data);
		} catch (error) {
			console.error('Error Group_telegram:', error);
			res.status(500).json({ error: 'Failed Group_telegram' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};

module.exports = { allGroupTelegram };
