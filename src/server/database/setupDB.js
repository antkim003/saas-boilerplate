import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import pg from 'pg';
import Promise from 'bluebird'

const initialize_to_create_a_db = (cb) => {
  const dbName = 'relay',
        username = 'postgres',
        password = 'password',
        host = 'localhost'

  const conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
  const conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;
  // connect to postgres db
  return new Promise((resolve,reject) => {
    pg.connect(conStringPri, function(err, client, done) {
      // create the db and ignore any errors, for example if it already exists.
      if (err) return reject(err)
      client.query('CREATE DATABASE ' + dbName, function(err) {
          //db should exist now, initialize Sequelize
          client.end(); // close the connection
          resolve(done)
      });
    });
  });
}

initialize_to_create_a_db()
  .then(()=> {
    const Conn = new Sequelize(
      'relay',
      'postgres',
      'postgres',
      {
        host: 'localhost',
        dialect: 'postgres',
      }
    );

    const User = Conn.define('user', {
      userName: {
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

    // overrides if tables exist
    Conn.sync({force: true}).then(() => {
      _.times(10, () => {
        return User.create({
          userName: Faker.name.firstName(),
          email: Faker.internet.email(),
          password: 'password'
        })
      })
    })

  })
  .catch(console.error)
