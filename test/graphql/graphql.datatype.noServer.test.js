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

describe('Graphql Datatype route testing, no server', () => {
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

  describe('getAllDatatypes', () => {
    it('it should get all the datatypes', done => {
      const query = "{getAllDatatypes{id,name,description,visible}}";
      graphql(Schema, query)
      .then(res => {
        const datatypes = res.data.getAllDatatypes;
        expect(datatypes).to.be.a('array');
        expect(datatypes.length).to.equal(2);
        expect(datatypes[0]).to.have.property('name');
        expect(datatypes[0]).to.have.property('description');
        expect(datatypes[0]).to.have.property('id');
        expect(datatypes[0]).to.have.property('visible');
        expect(datatypes[0].name).to.be.a('string');
        expect(datatypes[0].description).to.be.a('string');
        expect(datatypes[0].visible).to.be.a('boolean');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getDatatypeById', () => {
    it('it should get datatype by Id', done => {
      const query = "{getDatatypeById(id:1){id,name,description,visible}}";
      graphql(Schema, query)
      .then(res => {
        const datatype = res.data.getDatatypeById;
        expect(datatype).to.have.property('name');
        expect(datatype).to.have.property('description');
        expect(datatype).to.have.property('visible');
        expect(datatype).to.have.property('id');
        expect(datatype.name).to.be.a('string');
        expect(datatype.description).to.be.a('string');
        expect(datatype.visible).to.be.a('boolean');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  // describe('createDatatype', () => {
  //   it('it should create a datatype', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       // query: 'mutation{createPermission(name:"burn"){id,name}}'
  //       .send({
  //         query: 'mutation{createDatatype(name:"Toast on a stick",description:"Immortalize Larry Bud Melman",visible:true){id,name,description,visible}}'
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         // console.log('res.body.data.createDatatype', res.body.data.createDatatype);
  //         res.body.data.createDatatype.name.should.equal('toast on a stick');
  //         res.body.data.createDatatype.description.should.equal('Immortalize Larry Bud Melman');
  //         res.body.data.createDatatype.visible.should.equal(true);
  //         // res.body.data.createDatatype.id.should.equal(5);
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
  // describe('updateDatatype', () => {
  //   it('it should update a datatype', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       .send({
  //         query: 'mutation{updateDatatype(id:3,name:"grease the wheels",visible:false){id,name,description,visible}}'
  //       })
  //       .end((err, res) => {
  //         // console.log('res.body.data.updateDatatype', res.body.data.updateDatatype);
  //         res.should.have.status(200);
  //         res.body.data.updateDatatype.should.be.a('object');
  //         res.body.data.updateDatatype.name.should.equal('grease the wheels');
  //         res.body.data.updateDatatype.visible.should.equal(false);
  //         res.body.data.updateDatatype.id.should.equal(3);
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
  // describe('deleteDatatype', () => {
  //   it('it should delete a datatype', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       .send({
  //         query: 'mutation{deleteDatatype(id:4){id,name}}'
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.data.deleteDatatype.should.be.a('object');
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
}); // end testing block
