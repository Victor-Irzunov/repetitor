const { Raspisanie } = require('../../models/models');

const getAllUserRaspisanie = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { group } = req.query;
			const allRaspisanie = await Raspisanie.findAll({ where: { group } });
			res.status(201).json({ message: 'Расписания получено!', data: allRaspisanie });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { getAllUserRaspisanie };