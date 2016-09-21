/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');
import {seed} from '../../seed';
const should = chai.should();// eslint-disable-line no-unused-vars

describe('Asset Db testing', () => {
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

  describe('Get all assets', () => {
    it('should get all assets', done => {
      // Db.models.asset.findAll({order: 'id DESC'})
      Db.models.asset.findAll()
      .then(assets => {
        assets.should.be.a('array');
        assets.length.should.equal(3);
        assets[0].should.have.property('name');
        assets[0].should.have.property('description');
        assets[0].should.have.property('url');
        assets[0].should.have.property('id');
        assets[1].should.have.property('createdAt');
        assets[0].should.have.property('updatedAt');
        done();
      }); // end then
    });
  });

  describe('Create a asset', () => {
    it('should create a asset', done => {
      const newAsset = {
        name: 'Video Links',
        description: 'some video stuff',
        url: 'http://www.youtube.com'
      }
;
      Db.models.asset.create(newAsset)
      .then(asset => {
        asset.should.be.a('object');
        asset.should.have.property('name');
        asset.should.have.property('description');
        asset.should.have.property('url');
        asset.should.have.property('id');
        asset.should.have.property('createdAt');
        asset.should.have.property('updatedAt');
        asset.name.should.equal('Video Links');
        done();
      }); // end then
    });
  });
  // describe('Update a field', () => {
  //   it('should update a field', done => {
  //     Db.models.field.findById(3)
  //     .then(field => {
  //       return field.update({name: 'Cat Photoz'});
  //     })
  //     .then(field => {
  //       field.should.be.a('object');
  //       field.name.should.equal('Cat Photoz');
  //       done();
  //     });
  //   }); // end then
  // });
  // describe('Delete a field', () => {
  //   it('should delete a field', done => {
  //     Db.models.field.findById(3)
  //     .then(field => {
  //       return field.destroy();
  //     })
  //     .then(() => {
  //       return Db.models.field.findAll()
  //     })
  //     .then(fields => {
  //       fields.should.be.a('array');
  //       fields.length.should.equal(2);
  //       done();
  //     });
  //   }); // end then
  // });
}); // end projects test block
