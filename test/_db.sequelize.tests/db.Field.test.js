/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');

const should = chai.should();// eslint-disable-line no-unused-vars

describe('Field Db testing', () => {
  describe('Get all fields', () => {
    it('should get all fields', done => {
      Db.models.field.findAll()
      .then(fields => {
        fields.should.be.a('array');
        fields.length.should.equal(2);
        fields[0].should.have.property('name');
        fields[0].should.have.property('description');
        fields[0].should.have.property('id');
        fields[1].should.have.property('createdAt');
        fields[0].should.have.property('updatedAt');
        done();
      }); // end then
    });
  });

  describe('Create a field', () => {
    it('should create a field', done => {
      const newField = {
        name: 'JavaScript',
        description: 'What to use to code as a cool person'
      };
      Db.models.field.create(newField)
      .then(field => {
        field.should.be.a('object');
        field.should.have.property('name');
        field.should.have.property('description');
        field.should.have.property('id');
        field.should.have.property('createdAt');
        field.should.have.property('updatedAt');
        done();
      }); // end then
    });
  });
  describe('Update a field', () => {
    it('should update a field', done => {
      Db.models.field.findById(3)
      .then(field => {
        return field.update({name: 'Cat Photoz'});
      })
      .then(field => {
        field.should.be.a('object');
        field.name.should.equal('Cat Photoz');
        done();
      });
    }); // end then
  });
  describe('Delete a field', () => {
    it('should delete a field', done => {
      Db.models.field.findById(3)
      .then(field => {
        return field.destroy();
      })
      .then(() => {
        return Db.models.field.findAll()
      })
      .then(fields => {
        fields.should.be.a('array');
        fields.length.should.equal(2);
        done();
      });
    }); // end then
  });
}); // end projects test block
