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

describe('Graphql Project route testing, no server', () => {
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

  describe('getAllProjects', () => {
    it('it should get all the projects', done => {
        const query = "{getAllProjects{id,name,description}}";
        graphql(Schema, query)
        .then(res => {
          const projects = res.data.getAllProjects;
          expect(projects).to.be.a('array');
          expect(projects.length).to.equal(10);
          expect(projects[0]).to.have.property('name');
          expect(projects[0]).to.have.property('description');
          expect(projects[0]).to.have.property('id');
          expect(projects[0].name).to.be.a('string');
          expect(projects[0].description).to.be.a('string');
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('getUsersProjectsById', () => {
    it('it should get a users projects', done => {
        const query = "{getUsersProjectsById(id:1){id,name,description,categories}}";
        graphql(Schema, query)
        .then(res => {
          const projects = res.data.getUsersProjectsById;
          expect(projects).to.be.a('array');
          expect(projects.length).to.equal(2);
          expect(projects[0]).to.have.property('name');
          expect(projects[0]).to.have.property('description');
          expect(projects[0]).to.have.property('id');
          expect(projects[0].name).to.be.a('string');
          expect(projects[0].description).to.be.a('string');
          console.log('projects[0]!!!', projects[0]);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  // describe('getProjectById', () => {
  //   it('it should get a project by id', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       .send({
  //         query: "query{getProjectById(id:1){id,name,description}}"
  //       })
  //       .end((err, res) => {
  //         const project = res.body.data.getProjectById;
  //         res.should.have.status(200);
  //         project.should.be.a('object');
  //         project.should.have.property('name');
  //         project.should.have.property('description');
  //         project.should.have.property('id');
  //         project.name.should.be.a('string');
  //         project.description.should.be.a('string');
  //         project.name.should.contain('Promo');
  //         project.description.should.contain('ribs');
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
  // describe('getProjectsUsersByProjectId', () => {
  //   it('it should get a projects users by the project id', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       .send({
  //         query: "query{getProjectsUsersByProjectId(id:1){id,email}}"
  //       })
  //       .end((err, res) => {
  //         const users = res.body.data.getProjectsUsersByProjectId;
  //         res.should.have.status(200);
  //         users.should.be.a('array');
  //         users.length.should.equal(5);
  //         users[2].should.have.property('email');
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
  // describe('createProject', () => {
  //   it('it should create a project', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       // query: 'mutation{createPermission(name:"burn"){id,name}}'
  //       .send({
  //         query: 'mutation{createProject(name:"Toast on a stick",description:"Immortalize Larry Bud Melman"){id,name,description}}'
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         // console.log('res.body.data.createProject', res.body.data.createProject);
  //         res.body.data.createProject.name.should.equal('toast on a stick');
  //         res.body.data.createProject.description.should.equal('Immortalize Larry Bud Melman');
  //         // res.body.data.createProject.id.should.equal(5);
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
  // describe('updateProject', () => {
  //   it('it should update a project', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       .send({
  //         query: 'mutation{updateProject(id:3,name:"grease the wheels"){id,name,description}}'
  //       })
  //       .end((err, res) => {
  //         // console.log('res.body.data.updateProject', res.body.data.updateProject);
  //         res.should.have.status(200);
  //         res.body.data.updateProject.should.be.a('object');
  //         res.body.data.updateProject.name.should.equal('grease the wheels');
  //         res.body.data.updateProject.description.should.equal('Flank ribeye sirloin, rump bresaola beef pancetta short ribs porchetta chuck frankfurter. Kevin ribeye meatball bresaola shank pork belly. Ham beef chicken ball tip, cow spare ribs biltong drumstick pork beef ribs.');
  //         res.body.data.updateProject.id.should.equal(3);
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
  // describe('deleteProject', () => {
  //   it('it should delete a project', done => {
  //     chai.request('http://localhost:3000')
  //       .post('/graphql')
  //       .set({Authorization: `Bearer ${authToken}`})
  //       .send({
  //         query: 'mutation{deleteProject(id:4){id,name}}'
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.data.deleteProject.should.be.a('object');
  //         if (err) console.log(err);
  //         done();
  //       });
  //   });
  // });
}); // end testing block
