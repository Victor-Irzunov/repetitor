const express = require('express');
const next = require('next');
const sequelize = require('./utils/db');
require('dotenv').config();
const usersHandler = require('./app/api/register');
const loginUserHandler = require('./app/api/login');
const tokenHandler = require('./app/api/token').tokenHandler;
const getUserHandler = require('./app/api/data-user');

const createRaspisanitHandler = require('./app/api/raspisanie');
const getOneRaspisanitHandler = require('./app/api/raspisanitGetOne');
const getAllRaspisanitHandler = require('./app/api/raspisanieGetAllUser');
const editOneRaspisanitHandler = require('./app/api/raspisanieEdit');
const deleteOneRaspisanitHandler = require('./app/api/raspisanieDelete');

const addAdminDzHandler = require('./app/api/dzAdminAdd');
const addStudentDzHandler = require('./app/api/dataDzStudent');
const getStudentDzHandler = require('./app/api/dzGetStudent');
const getAllStudentsDzHandler = require('./app/api/dzGetAllAdmin');
const deleteOneDzHandler = require('./app/api/dzAdminDeleteOneUser');


const dnevnikAdminHandler = require('./app/api/dnevnikAdmin');
const dnevnikGetAllGroupAdminHandler = require('./app/api/dnevnikGetAllGroupData');
const dnevnikGetOneUserHandler = require('./app/api/dnevnikGetOneUser');

const videoAddAdminHandler = require('./app/api/videoAddAdmin');
const videoGetUserHandler = require('./app/api/videoGetUser');
const videoDeleteOneAdminHandler = require('./app/api/videoDeleteOneAdmin');

const getUserInfoAdminHandler = require('./app/api/userGetInfo');

const addPayAdminHandler = require('./app/api/paymentAddAdmin');
const getPayUserHandler = require('./app/api/payGetUser');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.use('/uploads', express.static('public/uploads'));


  server.get('/api/data-user', getUserHandler.getUserLoginData);


  server.get('/api/raspisanie', getOneRaspisanitHandler.getOneRaspisanie);
  server.get('/api/raspisanie/all', getAllRaspisanitHandler.getAllUserRaspisanie);

  server.get('/api/dz/user', getStudentDzHandler.getDzUser);
  server.get('/api/dz/user/all', getAllStudentsDzHandler.getAllDzUsers);

  server.get('/api/video', videoGetUserHandler.videoGetUser);
  server.delete('/api/video/:id', videoDeleteOneAdminHandler.videoDeleteOneAdmin);


  server.get('/api/dnevnik', dnevnikGetAllGroupAdminHandler.dnevnikGetAllGroupData);
  server.get('/api/dnevnik/one/:id', dnevnikGetOneUserHandler.dnevnikGetOneUser);

  server.get('/api/user/info', getUserInfoAdminHandler.userGetInfoData);

  server.get('/api/pay/:id', getPayUserHandler.getPayDataUser);


  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.all('/api', (req, res) => {
    app.render(req, res, '/404', req.query);
  });
  server.post('/api/register', usersHandler.createUser);
  server.post('/api/login', loginUserHandler.loginUser);
  server.post('/api/token', tokenHandler);

  server.post('/api/raspisanie', createRaspisanitHandler.createRaspisanie);
  server.put('/api/raspisanie', editOneRaspisanitHandler.raspisanieEdit);
  server.delete('/api/raspisanie', deleteOneRaspisanitHandler.deleteOneRaspisanie);

  server.post('/api/dz', addAdminDzHandler.dzAdminAdd);
  server.post('/api/dz/user', addStudentDzHandler.addDzStudent);
  server.delete('/api/dz/:id', deleteOneDzHandler.deleteOneDz);

  server.post('/api/ocenka', dnevnikAdminHandler.ocenkaAdminDnevnik);

  server.post('/api/video', videoAddAdminHandler.videoAddAdmin);

  server.post('/api/pay', addPayAdminHandler.paymentAddAdmin);

  const PORT = process.env.PORT || 3000;

  const start = async () => {
    try {
      await sequelize.authenticate()
        .then(() => {
          console.log('Подключение к базе данных установлено успешно');
        })
        .catch((error) => {
          console.error('Ошибка в подлючении:', error);
        });

      await sequelize.sync()
        .then(() => {
          console.log('Все модели были успешно синхронизированы');
        })
        .catch((error) => {
          console.error('Ошибка to synchronize models with the database:', error);
        });

      server.listen(PORT, () => console.log(`::::::::...The server is running on the port: ${PORT}...::::::::`));
    } catch (err) {
      console.log('error start: ', err);
    }
  };

  start();
});
