const fs = require('fs');
const path = require('path');
const { StudentDz } = require('../../models/models');

const deleteOneDz = async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      const id = req.params.id;
      const oneDz = await StudentDz.findOne({ where: { id } });
      if (oneDz.img && oneDz.img.length > 0) {
        const imageFileName = JSON.parse(oneDz.img)[0].image;
        const imagePath = path.join(__dirname, '../../public/uploads', imageFileName);
        fs.unlinkSync(imagePath);
      }
      const oneDeleteDz = await StudentDz.destroy({ where: { id } });
      console.log("🚀 🚀 🚀  _ file: dzAdminDeleteOneUser.js:22 _ deleteOneDz _ oneDeleteDz:", oneDeleteDz)

      res.status(201).json({ message: 'ДЗ удалено!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports = { deleteOneDz };
