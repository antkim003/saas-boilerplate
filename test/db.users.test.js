/* eslint-disable no-undef */
const Db = require('../src/server/database/setupDB');
const promise = require('bluebird');
import {Permissions, Usertypes, users, userTypesAssignments} from './user_list';
const chai = require('chai');
const chaiHttp = require('chai-http');
import promisify from 'es6-promisify';
import bcrypt from 'bcrypt';
const hash = promisify(bcrypt.hash);

// const server = require('.././src/server/server');
// const compare = promisify(bcrypt.compare);

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

let createdPermissions = [];
let createdUsertypes = [];

describe('User Db testing, before Hashing Passwords', () => {
  beforeEach(() => {
    return Db.sync({force: true})
      .then(() => {
        return Db.models.permission.bulkCreate(Permissions);
      })
      .then(() => {
        return Db.models.permission.findAll()
        .then(permissions => {
          createdPermissions = permissions;
        });
      })
      .then(() => {
        return Db.models.usertype.bulkCreate(Usertypes);
      })
      .then(() => {
        return Db.models.usertype.findAll()
        .then(usertypes => {
          createdUsertypes = usertypes;
          const userTypePromises = [];
          for (let i = 0; i < usertypes.length; i++) {
            userTypePromises.push(
            usertypes[i].setPermissions(createdPermissions));
          }
          return promise.each(userTypePromises, () => {// eslint-disable-line max-nested-callbacks
          });
        });
      })
      .then(() => {
        const passwordPromises = [];
        users.forEach(user => {
          passwordPromises.push(
            hash(user.password, 10)
            .then(hashedPassword => {// eslint-disable-line max-nested-callbacks
              user.password = hashedPassword;
              return;
            })
          );
        });
        return promise.each(passwordPromises, () => {});
      })
      .then(() => {
        const userPromises = []; // eslint-disable-line prefer-const
        users.forEach(user => {
          userPromises.push(
            Db.models.user.create(user)
          );
        });
        return promise.each(userPromises, () => {});
      })
      .then(users => {
        const userPromises = [];
        for (let i = 0; i < users.length; i++) {
          userPromises.push(
            users[i].addUserType(userTypesAssignments[i]));
        }
        return promise.each(userPromises, () => {});
      })
      .catch(error => {
        console.error(error);
      });
  });// end beforeEach

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
// describe('Db testing, After Hashed Passwords', function() {
//
//   beforeEach(function() {
//   return User.sync({force: true})
//     .then(function() {
//       return User.bulkCreate(userList)
//     })
//     .then(function(){
//       return User.findAll();
//     })
//     .then(function(users){
//       var promiseArray = [];
//       for (var i = 0; i < users.length; i++) {
//         var plainPassword = users[i].password
//         users[i].setPassword(plainPassword, null)
//         promiseArray.push(
//           users[i].save()
//         )
//       }//end for loop
//         return promise.each(promiseArray, function(result){
//         })
//         .then(function(){
//           return
//         })// end then
//     })//end then
//   })
//
//
//   describe('Get all users With Hashed Passwords', function() {
//     it('should get all users with Hashed Passwords', function(done) {
//       User.findAll()
//       .then(function(users){
//         users.should.be.a('array')
//         users.length.should.equal(4)
//         users[0].should.have.property('email')
//         users[1].should.have.property('salt')
//         users[2].should.have.property('password')
//         users[3].should.have.property('user_name')
//         // users[0].user_name.should.equal('obama')
//         // users[1].email.should.equal('bellacat@gmail.com')
//         users[1].password.should.not.equal('1234')
//         users[2].salt.length.should.not.equal(0)
//         users[0].admin.should.equal(1)
//
//         done()
//         }) // end then
//     });
//   });
//
//
// });//end Db testing,  Hashed Passwords test block
