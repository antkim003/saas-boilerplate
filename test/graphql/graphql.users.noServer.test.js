/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');
import {seed} from '../../seed';
const should = chai.should();// eslint-disable-line
import {expect} from 'chai';
import {graphql} from 'graphql';
import Schema from '../../src/server/graphql/rootSchema';
const chalk = require('chalk');
const error = chalk.bold.red;

describe('Graphql Users route testing, no server', () => {
  before(done => {
    seed().then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });
  after(done => {
    // console.log('Db', Db);
    Db.drop().then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });

  describe('getAllUsers', () => {
    it('it should get all the users', done => {
      const query = "{getAllUsers{id,name,email,active}}";
      graphql(Schema, query)
      .then(res => {
        const users = res.data.getAllUsers;
        expect(users.length).to.equal(5);
        expect(users[0]).to.have.property('name');
        expect(users[0]).to.have.property('email');
        expect(users[0]).to.have.property('id');
        expect(users[0].name).to.be.a('string');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getAllActiveUsers', () => {
    it('it should get all the users', done => {
      const query = "{getAllActiveUsers{id,name,email}}";
      graphql(Schema, query)
      .then(res => {
        const users = res.data.getAllActiveUsers;
        expect(users.length).to.equal(4);
        expect(users[0]).to.have.property('name');
        expect(users[0]).to.have.property('email');
        expect(users[0]).to.have.property('id');
        expect(users[0].name).to.be.a('string');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getAllUsersBy', () => {
    it('it should get all the users by', () => {
      const query = `{getAllUsersBy(email:"developer_admin@gmail.com")
        {
          id,email
        }
      }`;
      graphql(Schema, query)
        .then(res => {
          const users = res.data.getAllUsersBy;
          expect(users).to.be.an('array');
          expect(users.length).to.equal(1);
        });
    });
  });
  describe('getUserById', () => {
    let _user, _project;
    beforeEach(async () => {
      _user = await Db.models.user.create({
        name: "Bella Cat",
        email: "bellacat@gmail.com",
        password: "password",
        active: true
      });
      _project = await Db.models.project.create({
        name: "Cat trimming",
        description: "Not fun to do"
      });
      _user.addProject(_project);
      const save = await _user.save();
      return save;
    });
    it('it should get a user by Id', done => {
      const query = `{getUserById(id:${_user.id}){id,email,projects{name}}}`;
      graphql(Schema, query)
        .then(res => {
          const user = res.data.getUserById;
          expect(user).to.be.an('object');
          expect(user.email).to.equal('bellacat@gmail.com');
          expect(user.id).to.equal(_user.id);
          expect(user.projects).to.be.an('array');
          expect(user.projects[0].name).to.equal('Cat trimming');
          done();
        })
        .catch(done);
    });
  });
  describe('createUser', () => {
    it('it should create a user', done => {
      const query = `mutation{createUser(email:"bellacatmew@gmail.com",
            password:"catnip",
            name:"Bella The Cat",
            active:true,
            usertype:1){user {id,name,email,usertype,active}}}`;
      graphql(Schema, query)
        .then(res => {
          const createdUser = res.data.createUser;
          expect(createdUser.user).to.be.an('object');
          expect(createdUser.user.email).to.equal('bellacatmew@gmail.com');
          expect(createdUser.user.name).to.equal('Bella The Cat');
          expect(createdUser.user.active).to.equal(true);
          expect(createdUser.user.usertype).to.equal('developer');
          expect(createdUser.user.id).to.equal(7);
          done();
        })
        .catch(done);
    });
  });
  describe('updateUser', () => {
    it('it should update a user', done => {
      const query = `
        mutation{updateUser(id:7,email:"bellacatmew@gmail.com",password:"catnip",active:false,name:"Jasper",usertype:2){id,email,active,usertype,name}}`;
      graphql(Schema, query)
        .then(res => {
          const {updateUser} = res.data;
          expect(updateUser).to.be.an('object');
          expect(updateUser.email).to.equal('bellacatmew@gmail.com');
          expect(updateUser.name).to.equal('Jasper');
          expect(updateUser.id).to.equal(7);
          expect(updateUser.active).to.equal(false);
          expect(updateUser.usertype).to.equal('admin');
          done();
        })
        .catch(done);
    });
  });
  describe('deleteUser', () => {
    it('it should delete a user', done => {
      const query = `
        mutation{deleteUser(id:7){id}}`;
      graphql(Schema, query)
        .then(res => {
          const {deleteUser} = res.data;
          expect(deleteUser).to.be.an('object');
          expect(deleteUser.id).to.equal(7);
          done();
        })
        .catch(done);
    });
  });
}); // end testing block
