/* eslint-disable no-undef */
const promise = require('bluebird');
import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

let authToken = '';

describe('Graphql route testing, permissions', () => {
  // login to server inside beforeEach
  beforeEach(() => {
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
        }
      });
  });// end beforeEach

  describe('getAllPermissions', () => {
    it('it should get all the permissions', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
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
  describe('getPermissionById', () => {
    it('it should get a permission by id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
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
  describe('createPermission', () => {
    it('it should create a permission', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .send({
          query: 'mutation{createPermission(name:"fart"){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          console.log('res.body.data.createPermission', res.body.data);
          // res.body.data.getPermissionById.name.should.equal('write');
          // res.body.data.getPermissionById.id.should.equal(2);
          if (err) console.log(err);
          done();
        });
    });
  });

}); // end testing block
