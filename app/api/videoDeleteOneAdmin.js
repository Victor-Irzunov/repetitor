const { Video } = require('../../models/models');

const videoDeleteOneAdmin = async (req, res) => {
	if (req.method === 'DELETE') {
		try {
			const id = req.params.id
			const deleteVideo = await Video.destroy({ where: { id } });
			console.log("🚀 🚀 🚀  _ file: videoDeleteOneAdmin.js:9 _ videoDeleteOneAdmin _ deleteVideo:", deleteVideo)

			res.status(201).json({ message: 'Видео удалено!' });
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Failed videoDeleteOneAdmin' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};
module.exports = { videoDeleteOneAdmin };