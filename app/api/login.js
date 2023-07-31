const { User } = require('../../models/models');
// const sequelize = require('../../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Проверьте email и password, либо нет такого пользователя' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Неправильный email или password' });
    }
    // if (!user.isAdmin) {
    //   res.status(403).json({ message: 'Вы не администратор! Войти может только админстратор!!' });
    // }
    // Создание токена email: userDB.email, id: userDB.id, isAdmin: userDB.isAdmin
    const token = jwt.sign({ email: user.email, id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '30 days' });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка входа!' });
  }
}
module.exports = {
  loginUser
};
