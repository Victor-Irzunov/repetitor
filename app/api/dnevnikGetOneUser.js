const { Dnevnik } = require('../../models/models');

const dnevnikGetOneUser = async (req, res) => {
	console.log('--------------->')
	console.log('--------------->')
	console.log('--------------->')
	if (req.method === 'GET') {
		try {
			const id = req.params.id;
			const dnevnikUser = await Dnevnik.findAll({ where: { userId: id } });
			
			res.status(201).json({ data: dnevnikUser});
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};

module.exports = { dnevnikGetOneUser };
