const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  group: {
    type: DataTypes.STRING,
    allowNull: false
  },
})
const StudentDz = sequelize.define('student_dz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  primechanie: {
    type: DataTypes.STRING,
  },
  num: {
    type: DataTypes.STRING,
  },
})
const TeacherDz = sequelize.define('teacher_dz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  lesson: {
    type: DataTypes.STRING,
  },
  primechanie: {
    type: DataTypes.STRING,
  },
  group: {
    type: DataTypes.STRING,
  },
})
const Payment = sequelize.define('payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start: {
    type: DataTypes.STRING,
  },
  end: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN, defaultValue: false
  },
  title: {
    type: DataTypes.STRING,
  },
})

const Raspisanie = sequelize.define('raspisanie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  time_from: {
    type: DataTypes.STRING,
  },
  time_before: {
    type: DataTypes.STRING,
  },
  primechanie: {
    type: DataTypes.STRING,
  },
})

const Dnevnik = sequelize.define('dnevnik', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dz_num: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  ocenka: {
    type: DataTypes.STRING,
  },
  primechanie: {
    type: DataTypes.STRING,
  }
})

const Video = sequelize.define('video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
  },
  primechanie: {
    type: DataTypes.TEXT('long'),
  }
})

User.hasMany(StudentDz)
StudentDz.belongsTo(User)

User.hasOne(Dnevnik)
Dnevnik.belongsTo(User)

Video.hasOne(TeacherDz)
TeacherDz.belongsTo(Video)

User.hasMany(Payment)
Payment.belongsTo(User)


module.exports = {
  User,
  StudentDz,
  TeacherDz,
  Payment,
  Raspisanie,
  Dnevnik,
  Video
}
