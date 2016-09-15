/* eslint-disable no-undef */
import {seed} from '../seed';
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql Permissions route testing', () => {
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
  describe('getAllPermissions', () => {
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
          res.body.data.getAllPermissions[2].id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('getAllPermissions', () => {
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
