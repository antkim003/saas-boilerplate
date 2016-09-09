const DB
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

let userPromises = [];

users.forEach(user => {
  userPromises.push(
    Db.models.user.create(user)
  )
});

return Promise.all(userPromises);
