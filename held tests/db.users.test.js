/* eslint-disable no-undef */
const Db = require('../src/server/database/setupDB');
import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
const chai = require('chai');
const chaiHttp = require('chai-http');
import bcrypt from 'bcrypt';
import promisify from 'es6-promisify';
const hash = promisify(bcrypt.hash);
import {seed} from '../seed';
// const server = require('.././src/server/server');
// const compare = promisify(bcrypt.compare);

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('User Db testing, before Hashing Passwords', () => {
  before(done => {
    seed().then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });

  describe('This is only a test', () => {
    it('I am a placeholder', done => {
      users.should.be.a('array');
      users.length.should.equal(5);
      done();
    });
  });// end this is only a test

  describe('Get all users', () => {
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
  describe('Get all active users', () => {
    it('should get all active users', done => {
      Db.models.user.findAllActiveUsers()
      .then(users => {
        users.should.be.a('array');
        users.length.should.equal(4);
        done();
      }); // end then
    });
  });
  describe('Get User Permissions', () => {
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
  describe('Try out getUserType instance method', () => {
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
//
