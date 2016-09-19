/* eslint-disable no-undef */
// import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql Usertype route testing', () => {
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
  describe('getAllUserTypes', () => {
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
  describe('getUserTypeById', () => {
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
  describe('createUserType', () => {
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
  describe('getPermissionsListedOnUserTypebyId', () => {
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
  describe('deleteUserType', () => {
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
  describe('updateUserType', () => {
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
