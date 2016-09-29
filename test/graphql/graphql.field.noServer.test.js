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
      const query = "query{getAllFields{id,name,description,datatypes{name}}}";
      graphql(Schema, query)
      .then(res => {
        console.log('res!!!', res);
        const fields = res.data.getAllFields;
        console.log('fields!!!', fields);
        expect(fields).to.be.a('array');
        // fields.length.should.equal(5);
        expect(fields[0]).to.have.property('name');
        expect(fields[1]).to.have.property('description');
        expect(fields[1]).to.have.property('id');
        expect(fields[0].name).to.be.a('string');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  // describe('getFieldById', () => {
  //   let _category;
  //   let _datatype;
  //   beforeEach(async () => {
  //     _category = await Db.models.category.create({name: 'blah', visible: true});
  //     _datatype = await Db.models.datatype.create({name: 'datatype', description: 'this is a test', visible: true});
  //     _datatype.categoryId = _category.id;
  //     const save = await _datatype.save();
  //     return save;
  //   });
  //   it('it should get a category by id', done => {
  //     const query = `query{
  //       getFieldById(id:${_category.id}){
  //         id,name,visible,datatype {
  //           name, id, description
  //         }
  //       }
  //     }`;
  //     graphql(Schema, query)
  //     .then(res => {
  //       const category = res.data.getFieldById;
  //       expect(category.name).to.equal('blah');
  //       expect(category.visible).to.be.a('boolean');
  //       // expect(category.datatype).to.exist();
  //       expect(category.datatype.name).to.equal('datatype');
  //       done();
  //     })
  //     .catch(err => {
  //       console.log(error(err));
  //       // done();
  //     });
  //   });
  // });
  // describe('getFieldProject', () => {
  //   it('it should get a categorys projects by the category id', done => {
  //     const query = "query{getFieldProject(id:1){id,name}}";
  //     graphql(Schema, query)
  //     .then(res => {
  //       const project = res.data.getFieldProject;
  //       expect(project).to.be.a('object');
  //       expect(project).to.have.property('name');
  //       expect(project).to.have.property('id');
  //       expect(project.name).to.be.a('string');
  //       done();
  //     })
  //     .catch(err => {
  //       console.log(error(err));
  //       // done();
  //     });
  //   });
  // });
  // describe('updateField', () => {
  //   it('it should update a category', done => {
  //     const query = 'mutation{updateField(id:4,name:"grease the wheels",visible:false,datatype:2){id,name,visible}}';
  //     graphql(Schema, query)
  //     .then(res => {
  //       const category = res.data.updateField;
  //       expect(category).to.be.a('object');
  //       expect(category.name).to.equal('grease the wheels');
  //       expect(category.visible).to.equal(false);
  //       expect(category.id).to.equal(4);
  //       done();
  //     })
  //     .catch(err => {
  //       console.log(error(err));
  //       // done();
  //     });
  //   });
  // });
  // describe('deleteField', () => {
  //   it('it should delete a category', done => {
  //     const query = 'mutation{deleteField(id:4){id,name}}';
  //     graphql(Schema, query)
  //     .then(res => {
  //       const category = res.data.deleteField;
  //       expect(category).to.be.a('object');
  //       done();
  //     })
  //     .catch(err => {
  //       console.log(error(err));
  //       // done();
  //     });
  //   });
  // });
}); // end testing block
