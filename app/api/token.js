const jwt = require('jsonwebtoken');
// const sequelize = require('../../utils/db');
const { User } = require('../../models/models')

const tokenHandler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				return res.status(401).json({ message: 'Не авторизован' });
			}
			let decoded;
			try {
				decoded = jwt.verify(token, process.env.SECRET_KEY);
				const user = await User.findOne({ where: { id: decoded.id } });
				let newToken;
				if (user) {
					newToken = jwt.sign(
						{ email: user.email, id: user.id, isAdmin: user.isAdmin },
						process.env.SECRET_KEY,
						{ expiresIn: '30 days' }
					);
				}
				res.json({ token: newToken });
			} catch (error) {
				console.log('--my error1:',error)
				return res.status(401).json({ message: 'Ошибка регистрации!' });
			}
		} catch (error) {
			console.log('--my error2:',error)
			res.status(401).json({ message: 'Не авторизован' });
		}
	} else {
		res.status(405).json({ message: 'Метод не поддерживается' });
	}
};

module.exports = {
	tokenHandler,
};
