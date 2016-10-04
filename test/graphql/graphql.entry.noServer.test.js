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

describe('Graphql Entry route testing, no server', () => {
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

  describe('getAllEntries', () => {
    it('it should get all the entries', done => {
      const query = "query{getAllEntries{id,title,projectId,datatypeId,visible,data}}";
      graphql(Schema, query)
      .then(res => {
        const entries = res.data.getAllEntries;
        expect(entries.length).to.equal(4);
        expect(entries[1]).to.have.property('id');
        expect(entries[0]).to.have.property('title');
        expect(entries[0]).to.have.property('projectId');
        expect(entries[0]).to.have.property('datatypeId');
        expect(entries[1]).to.have.property('visible');
        expect(entries[0]).to.have.property('data');
        expect(entries[0].title).to.be.a('string');
        expect(entries[0].visible).to.be.a('boolean');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getEntryById', () => {
    it('it should get an entry by its id', done => {
      const query = "query{getEntryById(id:1){id,title,projectId,datatypeId,visible,data,categoryId}}";
      graphql(Schema, query)
      .then(res => {
        const entry = res.data.getEntryById;
        expect(entry).to.have.property('id');
        expect(entry).to.have.property('title');
        expect(entry).to.have.property('projectId');
        expect(entry).to.have.property('datatypeId');
        expect(entry).to.have.property('visible');
        expect(entry).to.have.property('data');
        expect(entry).to.have.property('categoryId');
        expect(entry.title).to.be.a('string');
        expect(entry.visible).to.be.a('boolean');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });

  describe('createEntry', () => {
    it('it should create an entry', done => {
      const query = `
      mutation{
          createEntry(title:"Yet Web Stuff TwoDudez",
            projectId:1,
            datatypeId:2,
            visible:true,
            categoryId:2,
            data:{stuff:"stuff",mosttuff:"yet mo stuff"})
  {id,title,projectId,datatypeId,visible,data,categoryId}}`;
      graphql(Schema, query)
      .then(res => {
        // console.log('res', res);
        const entry = res.data.createEntry;
        expect(entry).to.have.property('id');
        expect(entry.title).to.equal('Yet Web Stuff TwoDudez');
        expect(entry.datatypeId).to.equal(2);
        expect(entry.visible).to.equal(true);
        expect(entry.categoryId).to.equal(2);
        expect(entry.data.stuff).to.equal('stuff');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('updateEntry', () => {
    it('it should update an entry', done => {
      const query = `
      mutation{
          updateEntry(
            id:4,
            title:"Wowsa",
            projectId:2,
            datatypeId:1,
            visible:false,
            categoryId:1,
            data:{stuff:"stuff changed",mosttuff:"yet mo stuff changed"})
  {id,title,projectId,datatypeId,visible,data,categoryId}}`;
      graphql(Schema, query)
      .then(res => {
        console.log('res', res);
        const entry = res.data.updateEntry;
        expect(entry).to.have.property('id');
        expect(entry.id).to.equal(4);
        expect(entry.title).to.equal('Wowsa');
        expect(entry.datatypeId).to.equal(1);
        expect(entry.visible).to.equal(false);
        expect(entry.categoryId).to.equal(1);
        expect(entry.data.stuff).to.equal('stuff changed');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('deleteEntry', () => {
    it('it should delete an entry', done => {
      const query = 'mutation{deleteEntry(id:4){id}}';
      graphql(Schema, query)
      .then(res => {
        const category = res.data.deleteEntry;
        expect(category).to.be.a('object');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
