export const Permissions = [
  {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'modify'}
];

export const Usertypes = [
  {name: 'developer'}, {name: 'admin'}, {name: 'consumer'}
];

export const users = [
  {
    email: 'admin123@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'admin@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'developer_admin@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'user@gmail.com',
    password: 'password',
    active: true
  },
  {
    email: 'inactiveDude@gmail.com',
    password: 'password',
    active: false
  }
];

export const userTypesAssignments = [2, 2, 1, 3];
