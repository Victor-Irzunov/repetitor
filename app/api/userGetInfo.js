const { User, Payment } = require('../../models/models');
const { Op } = require('sequelize');

const userGetInfoData = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { name } = req.query
			const user = await User.findAll({
				where: { lastName: { [Op.substring]: name } },
				include: [
					{
						model: Payment
					}
				]
			});
			res.status(200).json(user);
		} catch (error) {
			console.error('Error retrieving data:', error);
			res.status(500).json({ error: 'Failed to retrieve data' });
		}
	}
}
module.exports = { userGetInfoData }