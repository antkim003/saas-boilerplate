/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');

const should = chai.should();// eslint-disable-line no-unused-vars

describe('Datatype Db testing', () => {
  describe('Get all datatypes', () => {
    it('should get all datatypes', done => {
      Db.models.datatype.findAll()
      .then(datatype => {
        datatype.should.be.a('array');
        datatype.length.should.equal(2);
        datatype[0].should.have.property('name');
        datatype[0].should.have.property('description');
        datatype[1].should.have.property('visible');
        datatype[0].should.have.property('id');
        datatype[1].should.have.property('createdAt');
        datatype[0].should.have.property('updatedAt');
        datatype[0].should.have.property('categoryId');
        done();
      }); // end then
    });
  });

  describe('Create a datatype', () => {
    it('should create a datatype', done => {
      const newDatatype = {
        name: 'recipez',
        description: 'how to cook things in the dark',
        visible: true,
        categoryId: 3
      };
      Db.models.datatype.create(newDatatype)
      .then(datatype => {
        datatype.should.be.a('object');
        datatype.should.have.property('name');
        datatype.should.have.property('description');
        datatype.should.have.property('visible');
        datatype.should.have.property('id');
        datatype.should.have.property('createdAt');
        datatype.should.have.property('updatedAt');
        datatype.should.have.property('categoryId');
        done();
      }); // end then
    });
  });
  describe('Get a datatypes fields', () => {
    it('should create a datatype', done => {
      Db.models.datatype.findById(1)
      .then(datatype => {
        return datatype.getFields();
      })
      .then(fields => {
        fields.should.be.a('array');
        fields.length.should.equal(2);
        done();
      });
    });
  });
  describe('Update a datatype', () => {
    it('should update a datatype', done => {
      Db.models.datatype.findById(3)
      .then(datatype => {
        return datatype.update({name: 'Cat Photoz'});
      })
      .then(datatype => {
        datatype.should.be.a('object');
        datatype.name.should.equal('Cat Photoz');
        done();
      });
    }); // end then
  });

  describe('Delete a datatype', () => {
    it('should delete a datatype', done => {
      Db.models.datatype.findById(3)
      .then(datatype => {
        return datatype.destroy();
      })
      .then(() => {
        return Db.models.datatype.findAll()
      })
      .then(datatypes => {
        datatypes.should.be.a('array');
        datatypes.length.should.equal(2);
        done();
      });
    }); // end then
  });
}); // end projects test block
