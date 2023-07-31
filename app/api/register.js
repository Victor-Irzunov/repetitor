const { User } = require('../../models/models');
// const sequelize = require('../../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { email, password, isAdmin , name, lastName, group} = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(401).json({ message: 'Пользователь уже зарегистрирован в системе' });
    }

    if (isAdmin) {
      const adminExists = await User.findOne({ where: { isAdmin: true } });
      if (adminExists) {
        return res.status(401).json({ message: 'Администратор уже существует' });
      }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDB = await User.create({
      email,
      password: hashedPassword,
      isAdmin,
      name,
      lastName,
      group
    });
    const token = jwt.sign(
      { email: userDB.email, id: userDB.id, isAdmin: userDB.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '30 days' }
    );
    res.status(200).json({ token, userDB });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка регистрации', error });
    }
    };
    module.exports = {
    createUser
    };