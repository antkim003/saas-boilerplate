/* eslint-disable no-undef */
const Db = require('../src/server/database/setupDB');
import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
const chai = require('chai');
const chaiHttp = require('chai-http');
import bcrypt from 'bcrypt';
// import promisify from 'es6-promisify';
// const hash = promisify(bcrypt.hash);
import {seed} from '../seed';

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql route testing', () => {
  let authToken = '';
  before(done => {
    seed().then(() => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .send({
          query: "query($email:Email!,$password:Password!){payload:login(email:$email, password:$password){user{id,email,isVerified},authToken}}",
          variables: {email: "admin123@gmail.com", password: "password"}
        })
        .end((err, res) => {
          authToken = res.body.data.payload.authToken;
          if (err) {
            console.log('Error inside before each ', err);
            done();
          }
          done();
        });
    })// end then
    .catch(err => {
      console.error(err);
    });
  });
  xdescribe('Permissions: getAllPermissions', () => {
    it('it should get all the permissions', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllPermissions{id,name}}"
        })
        .end((err, res) => {
          // console.log('res.body.data.getAllPermissions', res.body.data.getAllPermissions);
          res.should.have.status(200);
          res.body.data.getAllPermissions.length.should.equal(4);
          res.body.data.getAllPermissions[1].name.should.equal('write');
          res.body.data.getAllPermissions[2].id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('Permissions: getPermissionById', () => {
    it('it should get a permission by id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getPermissionById(id:2){id,name}}"
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.getPermissionById', res.body.data.getPermissionById);
          res.body.data.getPermissionById.name.should.equal('write');
          res.body.data.getPermissionById.id.should.equal(2);
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('Permissions: createPermission', () => {
    it('it should create a permission', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{createPermission(name:"burn"){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.createPermission', res.body.data);
          res.body.data.createPermission.name.should.equal('burn');
          res.body.data.createPermission.id.should.equal(5);
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('Permissions: deletePermission', () => {
    it('it should delete a permission', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{deletePermission(id:5){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.deletePermission', res.body.data.deletePermission);
          res.body.data.deletePermission.should.be.a('object');
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('Permissions: updatePermission', () => {
    it('it should update a permission', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{updatePermission(id:3,name:"lube"){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.updatePermission', res.body.data.updatePermission);
          res.body.data.updatePermission.should.be.a('object');
          res.body.data.updatePermission.name.should.equal('lube');
          res.body.data.updatePermission.id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('JWT Auth: test logging in again', () => {
    it('it should log in again', done => {
      chai.request('http://localhost:3000')
      .post('/graphql')
      .send({
        query: "query($email:Email!,$password:Password!){payload:login(email:$email, password:$password){user{id,email,isVerified},authToken}}",
        variables: {email: "admin123@gmail.com", password: "password"}
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.payload.authToken.should.be.a('string');
          // console.log('res.body.data.updatePermission', res.body.data.updatePermission);
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('JWT Auth: get Access when passing in JWT', () => {
    it('it should get all the permissions when passing JWT token', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllPermissions{id,name}}"
        })
        .end((err, res) => {
          // console.log('res.body.data.getAllPermissions', res.body.data.getAllPermissions);
          res.should.have.status(200);
          res.body.data.getAllPermissions.length.should.equal(4);
          res.body.data.getAllPermissions[1].name.should.equal('write');
          res.body.data.getAllPermissions[2].id.should.equal(4);
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('JWT Auth: get no Access when not passing in JWT', () => {
    it('it should fail getting the permissions when not passing JWT token', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .send({
          query: "{getAllPermissions{id,name}}"
        })
        .end((err, res) => {
          res.should.have.status(401);
          if (err) console.log('                 Login Failed, as it should.');
          done();
        });
    });
  });
  // users test block ///////////////////////////
  // /////////////////////////////
  describe('getAllUsers', () => {
      it('it should get all the users', done => {
        chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllUsers{id, email}}"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.getAllUsers.length.should.equal(5);
          res.body.data.getAllUsers[1].email.should.contain('@gmail.com');
          // res.body.data.getAllPermissions[2].id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('getAllActiveUsers', () => {
  it('it should get all the active users', done => {
    chai.request('http://localhost:3000')
      .post('/graphql')
      .set({Authorization: `Bearer ${authToken}`})
      .send({
        query: "{getAllActiveUsers{id,email}}"
      })
      .end((err, res) => {
        // console.log('res.body.data.getAllPermissions', res.body.data.getAllPermissions);
        res.should.have.status(200);
        res.body.data.getAllActiveUsers.length.should.equal(4);
        // res.body.data.getAllPermissions[1].name.should.equal('write');
        // res.body.data.getAllPermissions[2].id.should.equal(3);
        if (err) console.log(err);
        done();
      });
  });
  });
  describe('getAllUsersBy', () => {
    it('it should get all the users by', done => {
  chai.request('http://localhost:3000')
    .post('/graphql')
    .set({Authorization: `Bearer ${authToken}`})
    .send({
      query: '{getAllUsersBy(email:"developer_admin@gmail.com"){id,email}}'
    })
    .end((err, res) => {
      // console.log('res.body.data.getAllUsersBy', res.body.data.getAllUsersBy);
      res.should.have.status(200);
      res.body.data.getAllUsersBy.should.be.a('array');
      res.body.data.getAllUsersBy.length.should.equal(1);
      if (err) console.log(err);
      done();
    });
    });
  });
  describe('getUserById', () => {
    it('it should get a user by Id', done => {
  chai.request('http://localhost:3000')
    .post('/graphql')
    .set({Authorization: `Bearer ${authToken}`})
    .send({
      query: '{getUserById(id:3){id,email}}'
    })
    .end((err, res) => {
      console.log('res.body.data.getUserById', res.body.data.getUserById);
      res.should.have.status(200);
      res.body.data.getUserById.should.be.a('object');
      res.body.data.getUserById.email.should.contain('@gmail.com');
      res.body.data.getUserById.id.should.equal(3);
      if (err) console.log(err);
      done();
    });
    });
  });
  xdescribe('createUser', () => {
    it('it should create a user', done => {
  chai.request('http://localhost:3000')
    .post('/graphql')
    .set({Authorization: `Bearer ${authToken}`})
    .send({
      query: 'mutation{createUser(email:"bellacat@gmail.com",password:"catnip"){id,email}}'
    })
    .end((err, res) => {
      console.log('res.body.data.createUser', res.body.data.createUser);
      res.should.have.status(200);
      res.body.data.createUser.should.be.a('object');
      res.body.data.createUser.email.should.contain('bellacat@gmail.com');
      // res.body.data.createUser.id.should.equal(3);
      if (err) console.log(err);
      done();
    });
    });
  });


  // usertype test block ///////////////////////////
  // /////////////////////////////
  describe('Usertype: getAllUserTypes', () => {
    it('it should get all the usertypes', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllUserTypes{id,name}}"
        })
        .end((err, res) => {
          // console.log('res.body.data.getAllUserTypes', res.body.data.getAllUserTypes);
          res.should.have.status(200);
          res.body.data.getAllUserTypes.length.should.equal(3);
          res.body.data.getAllUserTypes[1].name.should.equal('admin');
          res.body.data.getAllUserTypes[2].name.should.equal('consumer');
          res.body.data.getAllUserTypes[2].id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('Usertype: getUserTypeById', () => {
    it('it should get a usertype by id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getUserTypeById(id:2){id,name}}"
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.getPermissionById', res.body.data.getPermissionById);
          res.body.data.getUserTypeById.should.be.a('object');
          res.body.data.getUserTypeById.name.should.equal('admin');
          res.body.data.getUserTypeById.id.should.equal(2);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('Usertype: createUserType', () => {
    it('it should create a usertype', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{createUserType(name:"cat",permissions:[{name:"read"},{name:"write"}]){id,name}}'
        })
        // createUserType(name:"purr",permissions:[{name:"read"}])
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.createUserType', res.body.data);
          res.body.data.createUserType.name.should.equal('cat');
          res.body.data.createUserType.id.should.equal(4);
          if (err) console.log(err);
          done();
        });
    });
  });
  // getPermissionsListedOnUserTypebyId
  describe('Usertype: getPermissionsListedOnUserTypebyId', () => {
    it('it should get a usertypes listed permissions by id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getPermissionsListedOnUserTypebyId(id:2){id,name}}"
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.getPermissionsListedOnUserTypebyId', res.body.data.getPermissionsListedOnUserTypebyId);
          res.body.data.getPermissionsListedOnUserTypebyId.should.be.a('array');
          res.body.data.getPermissionsListedOnUserTypebyId.length.should.equal(4);
          res.body.data.getPermissionsListedOnUserTypebyId[3].name.should.equal('modify');
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('Usertype: deleteUserType', () => {
    it('it should delete a usertype', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{deleteUserType(id:1){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.deleteUserType.should.be.a('object');
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('Usertype: updateUserType', () => {
    it('it should update a usertype', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{updateUserType(id:2,name:"catWrangler",permissions:[{name:"read"},{name:"write"}]){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.updateUserType', res.body.data.updateUserType);
          res.body.data.updateUserType.should.be.a('object');
          res.body.data.updateUserType.name.should.equal('catwrangler');
          res.body.data.updateUserType.id.should.equal(2);
          if (err) console.log(err);
          done();
        });
    });
  });
}); // end testing block

describe('Sequelize - Postgres Db testing, before Hashing Passwords', () => {
  before(done => {
    seed().then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });

  describe('Users: Get all users', () => {
    it('should get all users', done => {
      Db.models.user.findAll()
      .then(users => {
        users.should.be.a('array');
        users.length.should.equal(5);
        users[0].should.have.property('id');
        users[0].should.have.property('email');
        users[0].should.have.property('password');
        users[1].should.have.property('createdAt');
        users[2].should.have.property('updatedAt');
        users[3].should.have.property('usertypeId');
        users[3].should.have.property('active');
        users[0].email.should.contain('gmail.com');
        users[0].password.should.be.a('string');
        // users[0].usertypeId.should.equal(2);
        done();
      }); // end then
    });
  });
  describe('Users: Get all active users', () => {
    it('should get all active users', done => {
      Db.models.user.findAllActiveUsers()
      .then(users => {
        users.should.be.a('array');
        users.length.should.equal(4);
        done();
      }); // end then
    });
  });
  describe('Users: Get User Permissions', () => {
    it('should get the user permissions', done => {
      Db.models.user.find({where: {id: 1}})
      .then(user => {
        return user.getPermissions();
      })
      .then(res => {
        res.should.be.a('array');
        done();
      });
    });
  });
  describe('Users: Try out getUserType instance method', () => {
    it('should get the user type', done => {
      Db.models.user.find({where: {id: 1}})
      .then(user => {
        return user.getUserType();
      })
      .then(res => {
        res.name.should.equal('developer');
        done();
      });
    });
  });
}); // end Db testing, before Hashing Passwords test block
