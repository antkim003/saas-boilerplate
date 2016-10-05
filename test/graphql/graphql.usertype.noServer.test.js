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

describe('Graphql Usertype route testing, no server', () => {
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

  describe('getAllUserTypes', () => {
    it('it should get all the usertypes', done => {
      const query = "query{getAllUserTypes{id,name,permissions{id,name}}}";
      graphql(Schema, query)
      .then(res => {
        const usertypes = res.data.getAllUserTypes;
        expect(usertypes.length).to.equal(3);
        expect(usertypes[1]).to.have.property('id');
        expect(usertypes[0]).to.have.property('name');
        expect(usertypes[0]).to.have.property('permissions');

        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getUserTypeById', () => {
    it('it should get a usertypes by id', done => {
      const query = "query{getUserTypeById(id:2){id,name,permissions{id,name}}}";
      graphql(Schema, query)
      .then(res => {
        const usertype = res.data.getUserTypeById;
        expect(usertype).to.have.property('id');
        expect(usertype).to.have.property('name');
        expect(usertype.name).to.equal('admin');
        expect(usertype.id).to.equal(2);
        expect(usertype).to.have.property('permissions');

        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('createUserType', () => {
    it('it should create a usertype', done => {
      const query = 'mutation{createUserType(name:"cat",permissions:[{name:"read"},{name:"write"}]){id,name,permissions{id,name}}}';
      graphql(Schema, query)
      .then(res => {
        const usertype = res.data.createUserType;
        expect(usertype).to.have.property('id');
        expect(usertype).to.have.property('name');
        expect(usertype).to.have.property('permissions');
        expect(usertype.name).to.equal('cat');
        expect(usertype.id).to.equal(4);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getPermissionsListedOnUserTypebyId', () => {
    it('it should get a usertypes by id', done => {
      const query = "query{getPermissionsListedOnUserTypebyId(id:2){id,name}}";
      graphql(Schema, query)
      .then(res => {
        const permissions = res.data.getPermissionsListedOnUserTypebyId;
        expect(permissions[0].name).to.equal('read');
        expect(permissions[1].name).to.equal('write');
        expect(permissions.length).to.equal(4);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('updateUserType', () => {
    it('it should update a usertype', done => {
      const query = 'mutation{updateUserType(id:2,name:"catWrangler",permissions:[{name:"read"},{name:"write"}]){id,name,permissions{id,name}}}';
      graphql(Schema, query)
      .then(res => {
        const usertype = res.data.updateUserType;
        expect(usertype).to.have.property('id');
        expect(usertype).to.have.property('name');
        expect(usertype.name).to.equal('catwrangler');
        expect(usertype.id).to.equal(2);
        expect(usertype.permissions.length).to.equal(2);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('deleteUserType', () => {
    it('it should delete a usertype', done => {
      const query = 'mutation{deleteUserType(id:4){id}}';
      graphql(Schema, query)
      .then(res => {
        const usertype = res.data.deleteUserType;
        expect(usertype).to.have.property('id');
        expect(usertype.id).to.equal(null);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
