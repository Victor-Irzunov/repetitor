const { Raspisanie } = require('../../models/models');

const deleteOneRaspisanie = async (req, res) => {
	console.log('--------')
	if (req.method === 'DELETE') {
		try {
			const id = req.query.id
			console.warn("🚀 🚀 🚀  _ file: raspisanieDelete.js:8 _ deleteOneRaspisanie _ id:", id)
			const oneRaspisanie = await Raspisanie.destroy({ where: { id } });
			console.warn("🚀 🚀 🚀  _ file: raspisanieDelete.js:8 _ deleteOneRaspisanie _ oneRaspisanie:", oneRaspisanie)
			res.status(201).json({ message: 'Расписание удалено!' });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { deleteOneRaspisanie };