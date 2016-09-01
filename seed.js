import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import Db from './src/server/database/setupDB.js'


const users = [
  {
    username: 'anthony',
    email: 'admin123@gmail.com',
    password: 'password'
  },
  {
    username: 'admin',
    email: 'admin1234@gmail.com',
    password: 'password'
  },
  {
    username: 'developer_admin',
    email: 'developer_admin@gmail.com',
    password: 'password'
  }
]
// overrides if tables exist
Db.sync({force: true})
  .then(() => {
    return Db.models.permission.create({
      userType: "admin"
    })
  })
  .then((permission) => {
    return Db.models.user.bulkCreate(users)
  })
  .then((createdUsers) => {
    console.log("Seed was successful");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
