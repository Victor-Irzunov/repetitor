const { Payment } = require('../../models/models');

const paymentAddAdmin = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { userId, id, ...params } = req.body;
			const pay = await Payment.findOne({ where: { userId, id } })
			if (pay) {
				await pay.update(params);
				res.status(201).json({ message: 'Оплата обновлена!' });
			} else {
				await Payment.create({ userId, ...params });
				res.status(201).json({ message: 'Оплата зафиксирована!' });
			}
			
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};



module.exports = { paymentAddAdmin };
