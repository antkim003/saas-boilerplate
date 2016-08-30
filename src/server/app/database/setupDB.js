import _ from 'lodash';
import Faker from 'faker';
import pg from 'pg';
import Promise from 'bluebird'
import db from './models'

const initialize_to_create_a_db = (cb) => {

  const conStringPri = process.env.DATABASE_URL
  console.log('pg: ', conStringPri);
  // connect to postgres db
  return new Promise((resolve,reject) => {
    pg.connect(conStringPri, function(err, client, done) {
      // create the db and ignore any errors, for example if it already exists.
      if (err) return reject(err)
      client.query('CREATE DATABASE ' + process.env.DATABASE_NAME, function(err) {
          //db should exist now, initialize Sequelize
          client.end(); // close the connection
          resolve(done)
      });
    });
  });
}


initialize_to_create_a_db()
  .then(()=> {
    // overrides if tables exist
    return db.sequelize.sync({force: true})
  })
  .then((_db) => {
    console.log('db synced');
    // return db;

    return db;
  })
  .catch(console.error)

export default db;
