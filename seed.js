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
  .then(async () => {
    const user = await Db.models.user.bulkCreate([
      {
        email: 'admin123@gmail.com',
        password: 'password'
      },
      {
        email: 'admin1234@gmail.com',
        password: 'password'

      }]
    );
    // console.log('user', user);
    const usertype = await Db.models.usertype.findAll();
    const users = await Db.models.user.findAll();

    // console.log('usertype[0].datavalues',usertype[0]);
    users[0].usertypeid = 1;
    return users[0].save;
    // return users[1].setUsertypes(usertype[0]);
    // return usertype[0].setUser(user);
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
