const { Raspisanie } = require('../../models/models');

const getOneRaspisanie = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { group } = req.query;
			const oneRaspisanie = await Raspisanie.findOne({ where: { group } });
			res.status(201).json({ message: 'Расписание получено!', data: oneRaspisanie });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { getOneRaspisanie };