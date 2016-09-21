import Faker from 'faker';
import Db from './src/server/database/setupDB.js';
import promise from 'bluebird';
import {Permissions, Usertypes, users, userTypesAssignments, projects, categories, datatypes, fields, assets} from './test/user_list';
import promisify from 'es6-promisify';
import bcrypt from 'bcrypt';
const hash = promisify(bcrypt.hash);

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

function seed() {
  let createdPermissions = [];
  let createdUsertypes = [];
  let createdUsers = [];
  let createdcategories = [];
  let createdProjects = [];
  let createdFields = [];
  let createdDatatypes = [];

// overrides if tables exist
  return Db.drop()
  .then(() => {
    return Db.sync({force: true});
  })
// create permissions
  .then(() => {
    return Db.models.permission.bulkCreate(Permissions);
  })
  .then(() => {
    return Db.models.permission.findAll()
    .then(permissions => {
      createdPermissions = permissions;
    });
  })
  // now create usertypes
  .then(() => {
    return Db.models.usertype.bulkCreate(Usertypes);
  })
  // now set the Permissions on each usertype
  .then(() => {
    return Db.models.usertype.findAll()
    .then(usertypes => {
      createdUsertypes = usertypes;
      const userTypePromises = [];
      for (let i = 0; i < usertypes.length; i++) {
        // decide on exact permission that go with each usertype, then change this
        userTypePromises.push(
        usertypes[i].setPermissions(createdPermissions));
      }
      return promise.each(userTypePromises, () => {
      });
    });
  })
// hash passwords then create users
  .then(() => {
    const passwordPromises = [];
    users.forEach(user => {
      passwordPromises.push(
        hash(user.password, 10)
        .then(hashedPassword => {
          user.password = hashedPassword;
          return;
        })
      );
    });
    return promise.each(passwordPromises, () => {});
  })
  // now create users
  .then(() => {
    const userPromises = [];
    users.forEach(user => {
      userPromises.push(
        Db.models.user.create(user)
      );
    });
    return promise.each(userPromises, () => {});
  })
  // now add usertypes to each user with a setter
  .then(users => {
    const userPromises = [];
    for (let i = 0; i < users.length; i++) {
      userPromises.push(
        users[i].addUserType(userTypesAssignments[i]));
    }
    return promise.each(userPromises, () => {})
    .then(Users => {
      createdUsers = Users;
      return;
    });
  })
  // now create projects
  .then(() => {
    const projectPromises = [];
    projects.forEach(project => {
      projectPromises.push(
        Db.models.project.create(project)
      );
    });
    return promise.each(projectPromises, () => {});
  })
  // now add users to projects via setter
  .then(projects => {
    const userIntoProjectPromises = [];
    projects.forEach(project => {
      userIntoProjectPromises.push(
        project.setUsers(createdUsers)
      );
    });
    return promise.each(userIntoProjectPromises, () => {});
  })
  // find and store projects for later use
  .then(() => {
    return Db.models.project.findAll()
    .then(projects => {
      createdProjects = projects;
      return;
    });
  })
  // now create some categories
  .then(() => {
    const categoryPromises = [];
    categories.forEach(category => {
      categoryPromises.push(
        Db.models.category.create(category)
      );
    });
    return promise.each(categoryPromises, () => {})
    .then(categories => {
      createdcategories = categories;
      return;
    });
  })
  // now add parent Project to the individual categories
  .then(() => {
    const addCategoryToProjectPromises = [];
    for (let i = 0; i < 5; i++) {
      if (i < 2) {
        createdcategories[i].projectId = 1;
      } else {
        createdcategories[i].projectId = 2;
      }
      addCategoryToProjectPromises.push(
        createdcategories[i].save()
      );}
    return promise.each(addCategoryToProjectPromises, () => {});
  })
  // now create datatypes
  .then(() => {
    return Db.models.datatype.bulkCreate(datatypes)
    .then(() => {
      return Db.models.datatype.findAll()
      .then(datatypez => {
        createdDatatypes = datatypez;
        return;
      });
    });
  })
  // now create fields and store them on createdFields
  .then(() => {
    return Db.models.field.bulkCreate(fields)
    .then(() => {
      return Db.models.field.findAll()
      .then(fieldz => {
        createdFields = fieldz;
        return;
      });
    });
  })
  // now add fields to datatypes
  .then(() => {
    const datatypePromises = [];
    createdDatatypes.forEach(datatype => {
      datatypePromises.push(
        datatype.setFields(createdFields)
      );
    });
    return promise.each(datatypePromises, () => {})
    .then(datatypes => {
      createdDatatypes = datatypes;
      return;
    });
  })
  // now create some assets
  .then(() => {
    return Db.models.asset.bulkCreate(assets);
  })
  .then(() => {
    console.log("                Seed was successful");
    return Promise.resolve(null);
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  seed
};
