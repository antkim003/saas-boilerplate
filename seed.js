import Faker from 'faker';
import Db from './src/server/database/setupDB.js';
import promise from 'bluebird';
import {Permissions, Usertypes, users, userTypesAssignments} from './test/user_list';

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

let createdPermissions = [];
let createdUsertypes = [];

// overrides if tables exist
Db.sync({force: true})
  .then(() => {
    return Db.models.permission.bulkCreate(Permissions);
  })
  .then(() => {
    return Db.models.permission.findAll()
    .then(permissions => {
      createdPermissions = permissions;
    });
  })
  .then(() => {
    return Db.models.usertype.bulkCreate(Usertypes);
  })
  .then(() => {
    return Db.models.usertype.findAll()
    .then(usertypes => {
      createdUsertypes = usertypes;
      const userTypePromises = [];
      for (let i = 0; i < usertypes.length; i++) {
        userTypePromises.push(
        usertypes[i].setPermissions(createdPermissions));
      }
      return promise.each(userTypePromises, () => {
      });
    });
  })
  .then(() => {
    const userPromises = [];
    users.forEach(user => {
      userPromises.push(
        Db.models.user.create(user)
      );
    });
    return promise.each(userPromises, () => {});
  })
  .then(users => {
    const userPromises = [];
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
