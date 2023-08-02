const { Payment } = require('../../models/models');

const getPayDataUser = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { id } = req.params;
			const infoPay = await Payment.findAll({ where: { userId: id } });
			// console.log("🚀 🚀 🚀  _ file: payGetUser.js:8 _ getPayDataUser _ infoPay:", infoPay)
			if (infoPay) {
				res.status(201).json({ message: 'Ваши оплаты получены!', data: infoPay });
			} else {
				res.status(201).json({ message: 'Оплат нет!', data: infoPay });
			}
			
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { getPayDataUser };