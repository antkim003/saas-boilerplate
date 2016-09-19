/* eslint-disable no-undef */
// import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
// import {seed} from '../../seed';
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql Users route testing', () => {
  // before(done => {
  //   seed().then(() => {
  //     done();
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     done();
  //   });
  // });
  let authToken = '';
  beforeEach(done => {
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
  });// end before
  // logging out after each login.
  afterEach(done => {
    authToken = '';
    done();
  });
  describe('getAllUsers', () => {
    it('it should get all the users', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllUsers{id,email}}"
        })
        .end((err, res) => {
          // console.log('res.body.data.getAllPermissions', res.body.data.getAllPermissions);
          res.should.have.status(200);
          res.body.data.getAllUsers.length.should.equal(5);
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
        // console.log('res.body.data.getAllActiveUsers', res.body.data.getAllActiveUsers);
        res.should.have.status(200);
        res.body.data.getAllActiveUsers.length.should.equal(4);
        res.body.data.getAllActiveUsers[1].email.should.contain('gmail.com');
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
      // console.log('res.body.data.getUserById', res.body.data.getUserById);
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
      query: 'mutation{createUser(email:"bellacat@gmail.com",password:"catnip"){}}'
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
   describe('updateUser', () => {
    it('it should update a user', done => {
      chai.request('http://localhost:3000')
    .post('/graphql')
    .set({Authorization: `Bearer ${authToken}`})
    .send({
      query: 'mutation{updateUser(id:3,email:"bellacat@gmail.com",password:"catnip",active:true){id,email,active}}'
    })
    .end((err, res) => {
      // console.log('res.body.data.updateUser', res.body.data.updateUser);
      res.should.have.status(200);
      res.body.data.updateUser.should.be.a('object');
      res.body.data.updateUser.email.should.contain('bellacat@gmail.com');
      res.body.data.updateUser.id.should.equal(3);
      res.body.data.updateUser.active.should.equal(true);
      if (err) console.log(err);
      done();
    });
    });
  });
}); // end testing block
