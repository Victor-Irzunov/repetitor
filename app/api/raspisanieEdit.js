// server/api/raspisanie.js
const { Raspisanie } = require('../../models/models');

const raspisanieEdit = async (req, res) => {
  console.log('----------');
  if (req.method === 'PUT') {
    try {
      const { group, title, date, time_from, time_before, primechanie, id } = req.body;


      // Check if the provided 'id' is a positive integer before updating
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid or missing ID in the request' });
      }

      const updatedRows = await Raspisanie.update(
        {
          group,
          title,
          date,
          time_from,
          time_before,
          primechanie,
        },
        { where: { id: id } }
      );

      // Check if any rows were updated
      if (updatedRows[0] === 0) {
        return res.status(404).json({ error: 'Schedule entry not found' });
      }

      res.status(201).json({ message: 'Расписание обновлено успешно', data: updatedRows });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports = { raspisanieEdit };
