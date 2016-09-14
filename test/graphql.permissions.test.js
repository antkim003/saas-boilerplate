/* eslint-disable no-undef */
const promise = require('bluebird');
// import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
const chai = require('chai');
const chaiHttp = require('chai-http');

// import {graphql} from 'graphql';
// import Schema from '../src/server/graphql/rootSchema';
// const server = require('.././src/server/server');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql route testing, permissions', () => {
  beforeEach(() => {
  });// end beforeEach
// "{"query":"query($email:Email!,$password:Password!){payload:login(email:$email,password:$password){user{id,email,isVerified},authToken}}","variables":{"email":"admin123@gmail.com","password":"password"}}"
  describe('Get All Users', () => {
      it('it should get all the permissions', (done) => {
          chai.request('http://localhost:3000')
              .post('/graphql')
              .send({query: "query($email:Email!,$password:Password!){payload:login(email:$email, password:$password){user{id,email,isVerified},authToken}}", variables: {email: "admin123@gmail.com", password: "password"}})
              .end((err, res) => {
                console.log(res.body.data.payload.authToken);
                res.should.have.status(200);
                if (err) {
                  // console.log(err);
                };
                done();
              });
        });
    });

}); // end testing block
