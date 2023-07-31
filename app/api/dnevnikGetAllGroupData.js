const { Dnevnik, User } = require('../../models/models');

const dnevnikGetAllGroupData = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { group } = req.query;
			const users = await User.findAll({ where: { group } });
			const oneDzData = [];
			for (const user of users) {
				const oneDz = await Dnevnik.findOne({ where: { userId: user.id } });
				if (oneDz) oneDzData.push(oneDz);

			}
			res.status(201).json({ data: oneDzData });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};

module.exports = { dnevnikGetAllGroupData };
