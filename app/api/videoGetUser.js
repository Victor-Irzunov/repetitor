const { Video } = require('../../models/models');

const videoGetUser = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { group } = req.query;

			const video = await Video.findAll({ where: { group } });
			if (video.length) {
				res.status(201).json({ message: 'Записи получены!', data: video });
			} else {
				res.status(201).json({ message: 'Записи уроков нет!', data: video });
			}
			
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { videoGetUser };