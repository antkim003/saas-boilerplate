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
console.log('inside the first test',process.env.NODE_ENV);

describe('Graphql Asset route testing, no server', () => {
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

  describe('getAllAssets', () => {
    it('it should get all the assets', done => {
      const query = "query{getAllAssets{id,name,description,url}}";
      graphql(Schema, query)
      .then(res => {
        const assets = res.data.getAllAssets;
        assets.should.be.a('array');
        assets.length.should.equal(3);
        expect(assets[0]).to.have.property('name');
        expect(assets[1]).to.have.property('description');
        expect(assets[1]).to.have.property('id');
        expect(assets[0]).to.have.property('id');
        expect(assets[0]).to.have.property('url');
        expect(assets[0].name).to.be.a('string');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getAssetById', () => {
    it('it should get an asset by id', done => {
      const query = "query{getAssetById(id:1){id,name,description,url}}";
      graphql(Schema, query)
      .then(res => {
        const asset = res.data.getAssetById;
        expect(asset).to.have.property('name');
        expect(asset).to.have.property('description');
        expect(asset).to.have.property('id');
        expect(asset).to.have.property('id');
        expect(asset).to.have.property('url');
        expect(asset.name).to.be.a('string');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('updateAsset', () => {
    it('it should update a asset', done => {
      const query = 'mutation{updateAsset(id:1,name:"grease the wheelz",description:"holy cow!",url:"http://www.cats.com"){id,name,description,url}}';
      graphql(Schema, query)
      .then(res => {
        const asset = res.data.updateAsset;
        expect(asset).to.be.a('object');
        expect(asset.name).to.equal('grease the wheelz');
        expect(asset.description).to.equal("holy cow!");
        expect(asset.url).to.equal("http://www.cats.com");
        expect(asset.id).to.equal(1);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('deleteAsset', () => {
    it('it should delete a asset', done => {
      const query = 'mutation{deleteAsset(id:2){id}}';
      graphql(Schema, query)
      .then(res => {
        const asset = res.data.deleteAsset;
        expect(asset).to.be.a('object');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
