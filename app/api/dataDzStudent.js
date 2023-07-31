const { StudentDz } = require('../../models/models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const name = uuidv4() + '.webp';
    cb(null, name);
  },
});
const upload = multer({ storage }).array('img');


const addDzStudent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log('Ошибка при загрузке файла:', err);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
    if (req.method === 'POST') {
      try {
        const { primechanie, id, num, title } = req.body;

        const fileName = [];
        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            const name = uuidv4() + '.webp';
            fileName.push({ image: name });
            const filePath = path.resolve(__dirname, '../../public/uploads', name);
            await fs.promises.rename(file.path, filePath);
          }
        }
        const data = await StudentDz.create({
          primechanie,
          num,
          title,
          img: JSON.stringify(fileName),
          userId: id
        });
        return res.status(201).json(data);
      } catch (e) {
        console.log('Ошибка:', e);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      }
    }
  });
};

module.exports = { addDzStudent };
