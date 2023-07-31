const { TeacherDz } = require('../../models/models');

const getDzUser = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { group } = req.query;
			const oneDz = await TeacherDz.findOne({ where: { group } });
			if (oneDz) {
				res.status(201).json({ message: 'Домашнее задание получено!', data: oneDz });
			} else {
				res.status(201).json({ message: 'Домашнего задания нет!', data: oneDz });
			}
			
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { getDzUser };