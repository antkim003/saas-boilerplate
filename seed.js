import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'
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
let __articles = []
for (var i = 0; i < 4; i++) {
  __articles.push(
    {
      title: Faker.lorem.words(),
      headline: Faker.lorem.sentence(),
      body: Faker.lorem.paragraphs(),
      userId: null
    }
  )
}
// overrides if tables exist
console.log("db.models: ", Db.models);
Db.sync({force: true})
  .then(() => {
    return Db.models.permission.create({
      userType: "admin"
    })
  })
  .then((permissions) => {
      return Db.models.user.bulkCreate(users)
  })
  .then((createdUsers) => {
      __articles.map(function(article){
        article.userId = Math.floor((Math.random() * createdUsers.length) + 1)
    })
      return Db.models.article.bulkCreate(__articles)
  })
  .then((createdArticles) => {
    console.log("Seed was successful")
    process.exit(0)
  })
  .catch(() => {
    process.exit(1)
  });
