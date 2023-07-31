const { TeacherDz } = require('../../models/models');
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
const dzAdminAdd = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log('Ошибка при загрузке файла:', err);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
    if (req.method === 'POST') {
      try {
        const { group, lesson, primechanie, title } = req.body;
        const fileName = [];
        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            const name = uuidv4() + '.webp';
            fileName.push({ image: name });
            const filePath = path.resolve(__dirname, '../../public/uploads', name);
            await fs.promises.rename(file.path, filePath);
          }
        }
        const data = await TeacherDz.create({
          group,
          lesson,
          title,
          primechanie,
          img: JSON.stringify(fileName),
        });
        return res.status(201).json(data);
      } catch (e) {
        console.log('Ошибка:', e);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      }
    }
  });
};

module.exports = { dzAdminAdd };
