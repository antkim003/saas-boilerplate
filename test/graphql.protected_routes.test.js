/* eslint-disable no-undef */
import {seed} from '../seed';
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql Protected route testing', () => {
  // auth token cache this is working like localStorage would on our clientside
  let authToken = '';
  // before(done => {
  //   seed().then(done, done);
  // });
  // logging in here for authentication
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
  });
  // logging out after each login.
  afterEach(done => {
    authToken = '';
    done();
  });
  describe('With Token', () => {
    it('it should get all the permissions when passing JWT token', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllPermissions{id,name}}"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.getAllPermissions.length.should.equal(4);
          res.body.data.getAllPermissions[1].name.should.equal('write');
          res.body.data.getAllPermissions[2].id.should.equal(4);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('Without Token', () => {
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
}); // end testing block
