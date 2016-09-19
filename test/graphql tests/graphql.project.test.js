/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql Project route testing', () => {
  let authToken = '';
  beforeEach(done => {
    chai.request('http://localhost:3000')
      .post('/graphql')
      .send({
        query: "query($email:Email!,$password:Password!){payload:login(email:$email, password:$password){user{id,email,isVerified},authToken}}",
        variables: {email: "admin123@gmail.com", password: "password"}
      })
      .end((err, res) => {
        authToken = res.body.data.payload.authToken;
        if (err) {
          console.log('Error inside before each ', err);
          done();
        }
        done();
      });
  });// end before
  // logging out after each login.
  afterEach(done => {
    authToken = '';
    done();
  });

  describe('getAllProjects', () => {
    it('it should get all the projects', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllProjects{id,name,description}}"
        })
        .end((err, res) => {
          // console.log('res.body.data.getAllProjects', res.body.data.getAllPermissions);
          const projects = res.body.data.getAllProjects;
          res.should.have.status(200);
          projects.should.be.a('array');
          projects.length.should.equal(3);
          projects[0].should.have.property('name');
          projects[1].should.have.property('description');
          projects[0].should.have.property('id');
          projects[0].name.should.be.a('string');
          projects[1].description.should.be.a('string');
          projects[1].name.should.contain('Promo');
          projects[1].description.should.contain('ribs');
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('getProjectById', () => {
    it('it should get a project by id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getProjectById(id:1){id,name,description}}"
        })
        .end((err, res) => {
          const project = res.body.data.getProjectById;
          res.should.have.status(200);
          project.should.be.a('object');
          project.should.have.property('name');
          project.should.have.property('description');
          project.should.have.property('id');
          project.name.should.be.a('string');
          project.description.should.be.a('string');
          project.name.should.contain('Promo');
          project.description.should.contain('ribs');
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('getProjectsUsersByProjectId', () => {
    it('it should get a projects users by the project id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getProjectsUsersByProjectId(id:1){id,email}}"
        })
        .end((err, res) => {
          const users = res.body.data.getProjectsUsersByProjectId;
          res.should.have.status(200);
          users.should.be.a('array');
          users.length.should.equal(5);
          users[2].should.have.property('email');
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('createProject', () => {
    it('it should create a project', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{createProject(name:"Toast on a stick",description:"A site that memorializes Larry Bud"){id,name,description}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          console.log('res.body.data.createProject', res.body.data.createProject);
          res.body.data.createProject.name.should.equal('burn');
          // res.body.data.createProject.id.should.equal(5);
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('deleteProject', () => {
    it('it should delete a project', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{deleteProject(id:5){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          console.log('res.body.data.deleteProject', res.body.data.deleteProject);
          res.body.data.deleteProject.should.be.a('object');
          if (err) console.log(err);
          done();
        });
    });
  });
  xdescribe('updateProject', () => {
    it('it should update a permission', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{updatePermission(id:3,name:"lube"){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.updatePermission', res.body.data.updatePermission);
          res.body.data.updatePermission.should.be.a('object');
          res.body.data.updatePermission.name.should.equal('lube');
          res.body.data.updatePermission.id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
}); // end testing block
