import Faker from 'faker';
import Db from './src/server/database/setupDB.js';

const Permissions = [
  {name: 'read'},
  {name: 'write'},
  {name: 'delete'},
  {name: 'modify'}
];

const Usertypes = [
  {
    name: 'developer'
  },
  {
    name: 'admin'
  },
  {
    name: 'consumer'
  }
];

const users = [
  {
    email: 'admin123@gmail.com',
    password: 'password'
  },
  {
    email: 'admin1234@gmail.com',
    password: 'password'

  },
  {
    email: 'developer_admin@gmail.com',
    password: 'password'
  }
];
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
console.log('db.models ');
Db.sync({force: true})
  .then(() => {
    return Db.models.permission.bulkCreate(Permissions);
  })
  .then(() => {
    return Db.models.usertype.bulkCreate(Usertypes);
  })
  .then(() => {
    return Db.models.user.bulkCreate([
      {
        email: 'admin123@gmail.com',
        password: 'password'
      },
      {
        email: 'admin1234@gmail.com',
        password: 'password'

      }]
    );
  })
  .then(() => {
    return Db.models.user.findAll();
  })
  .then(users => {
    users[0].addUserType(2);
    return users[0].save();
  })
  .then(user => {
    return user.getUserType();
  })
  .then(usertype => {
    console.log('usertype.name', usertype.name);
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
