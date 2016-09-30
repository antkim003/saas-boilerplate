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

describe('Graphql Field route testing, no server', () => {
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

  describe('getAllFields', () => {
    it('it should get all the fields', done => {
      const query = "query{getAllFields{id,name,description,datatypes{name,id,description}}}";
      graphql(Schema, query)
      .then(res => {
        const fields = res.data.getAllFields;
        expect(fields).to.be.a('array');
        expect(fields.length).to.equal(2);
        expect(fields[0]).to.have.property('name');
        expect(fields[1]).to.have.property('description');
        expect(fields[1]).to.have.property('id');
        expect(fields[1]).to.have.property('datatypes');
        expect(fields[0].name).to.be.a('string');
        expect(fields[0].datatypes).to.be.a('array');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getFieldById', () => {
    it('it should get a field by id', done => {
      const query = "query{getFieldById(id:1){id,name,description,datatypes{name,id,description}}}";
      graphql(Schema, query)
      .then(res => {
        const field = res.data.getFieldById;
        expect(field).to.be.a('object');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('id');
        expect(field).to.have.property('datatypes');
        expect(field.name).to.be.a('string');
        expect(field.datatypes).to.be.a('array');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('createField', () => {
    it('it should create a field', done => {
      const query = 'mutation{createField(name:"Mike Powers Cool Spy",description:"A field of spies",datatypes:[1]){id,name,description,datatypes{name,id,description}}}';
      graphql(Schema, query)
      .then(res => {
        const field = res.data.createField;
        expect(field).to.be.a('object');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('id');
        expect(field).to.have.property('datatypes');
        expect(field.name).to.be.a('string');
        expect(field.name).to.equal('Mike Powers Cool Spy');
        expect(field.description).to.equal('A field of spies');
        expect(field.datatypes).to.be.a('array');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('updateField', () => {
    it('it should update a field, finding it by id', done => {
      const query = 'mutation{updateField(id:3,name:"Mike Powers",description:"His yard",datatypes:[1,2]){id,name,description,datatypes{name,id,description}}}';
      graphql(Schema, query)
      .then(res => {
        const field = res.data.updateField;
        expect(field).to.be.a('object');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('id');
        expect(field).to.have.property('datatypes');
        expect(field.name).to.be.a('string');
        expect(field.name).to.equal('Mike Powers');
        expect(field.description).to.equal('His yard');
        expect(field.datatypes).to.be.a('array');
        expect(field.datatypes.length).to.equal(2);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('deleteField', () => {
    it('it should delete a field, finding it by id', done => {
      const query = 'mutation{deleteField(id:3){id,name}}';
      graphql(Schema, query)
      .then(res => {
        const field = res.data.deleteField;
        expect(field).to.be.a('object');
        expect(field.name).to.equal(null);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
