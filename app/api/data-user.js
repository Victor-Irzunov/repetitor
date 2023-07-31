const { User } = require('../../models/models')

const getUserLoginData = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const id = req.query.id
			const user = await User.findOne({ where: { id } });
			res.status(200).json(user);
		} catch (error) {
			console.error('Error retrieving data:', error);
			res.status(500).json({ error: 'Failed to retrieve data' });
		}
	}
}
module.exports = { getUserLoginData }