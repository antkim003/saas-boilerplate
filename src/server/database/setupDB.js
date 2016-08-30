import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import pg from 'pg';
import Promise from 'bluebird';
import {getDotenv} from '../../universal/utils/dotenv';

getDotenv();

console.log('database: ', process.env.DATABASE_URL);
const Conn = new Sequelize(process.env.DATABASE_URL)
const User = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Permission = Conn.define('permission', {
  userType: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.hasOne(Permission);

// overrides if tables exist
Conn.sync({force: true})
  .then(() => {
    _.times(10, () => {
      return User.create({
        username: Faker.name.firstName(),
        email: Faker.internet.email(),
        password: 'password'
      })
      .then((user) => {
        return user.createPermission({
          userType: "admin"
        })
      })
    })
  })
  .catch(console.error)

export default Conn
