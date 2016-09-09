import Faker from 'faker';
import Db from './src/server/database/setupDB.js';
import promise from 'bluebird';

const Permissions = [
  {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'modify'}
];

const Usertypes = [
  {name: 'developer'}, {name: 'admin'}, {name: 'consumer'}
];

const users = [
  {
    email: 'admin123@gmail.com',
    password: 'password'
  },
  {
    email: 'admin@gmail.com',
    password: 'password'
  },
  {
    email: 'developer_admin@gmail.com',
    password: 'password'
  },
  {
    email: 'user@gmail.com',
    password: 'password'
  }
];

const userTypesAssignments = [2, 2, 1, 3];

const __articles = [];

for (let i = 0; i < 4; i++) {
  __articles.push(
    {
      title: Faker.lorem.words(),
      headline: Faker.lorem.sentence(),
      body: Faker.lorem.paragraphs(),
      userId: null
    }
  );
}
// overrides if tables exist
Db.sync({force: true})
  .then(() => {
    return Db.models.permission.bulkCreate(Permissions);
  })
  .then(() => {
    return Db.models.usertype.bulkCreate(Usertypes);
  })
  .then(() => {
    let userPromises = [];
    users.forEach(user => {
      userPromises.push(
        Db.models.user.create(user)
      );
    });
    return promise.each(userPromises, () => {});
  })
  .then(users => {
    let userPromises = [];
    for (let i = 0; i < users.length; i++) {
      userPromises.push(
        users[i].addUserType(userTypesAssignments[i]));
    }
    return promise.each(userPromises, () => {});
  })
  // .then(createdUsers => {
  //   __articles.map(article => {
  //     article.userId = Math.floor((Math.random() * createdUsers.length) + 1);
  //     return article;
  //   });
  //   return Db.models.article.bulkCreate(__articles);
  // })
  .then(() => {
    console.log("Seed was successful");
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
