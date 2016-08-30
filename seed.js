'use strict';


import _ from 'lodash';
import Faker from 'faker';
import pg from 'pg';
import Promise from 'bluebird'
import {getDotenv} from './src/universal/utils/dotenv'
var db = require('./src/server/app/database/setupDB.js');

getDotenv();

const users = [
  {
    username: "test123",
    email: "test123@test.com",
    password: "password"
  },
  {
    username: "test2",
    email: "test2@test.com",
    password: "password"
  },
  {
    username: "test3",
    email: "test3@test.com",
    password: "password"
  }
]

console.log('users: ', users, db);
db.User.bulkCreate(users)
  .then(() => {
    return db.User.findAll();
  })
  .then((users) => {
    console.log('users were created', users);
    process.exit();
  })
  .catch(console.error)
