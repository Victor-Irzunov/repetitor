// server/api/raspisanie.js
const { Raspisanie } = require('../../models/models');

const createRaspisanie = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Получаем данные из тела запроса
      const { group, title, date, time_from, time_before, primechanie } = req.body;

      // Создаем новую запись в базе данных
      const newRaspisanie = await Raspisanie.create({
        group,
        title,
        date,
        time_from,
        time_before,
        primechanie,
      });

      // Возвращаем успешный ответ
      res.status(201).json({ message: 'Расписание создано успешно', data: newRaspisanie });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  } else {
    // Возвращаем ошибку, если метод запроса не POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};



module.exports = { createRaspisanie };
