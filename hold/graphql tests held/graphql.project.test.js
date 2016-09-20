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
          // projects[1].name.should.contain('Promo');
          // projects[1].description.should.contain('ribs');
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
  describe('createProject', () => {
    it('it should create a project', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        // query: 'mutation{createPermission(name:"burn"){id,name}}'
        .send({
          query: 'mutation{createProject(name:"Toast on a stick",description:"Immortalize Larry Bud Melman"){id,name,description}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.createProject', res.body.data.createProject);
          res.body.data.createProject.name.should.equal('toast on a stick');
          res.body.data.createProject.description.should.equal('Immortalize Larry Bud Melman');
          // res.body.data.createProject.id.should.equal(5);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('updateProject', () => {
    it('it should update a project', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{updateProject(id:3,name:"grease the wheels"){id,name,description}}'
        })
        .end((err, res) => {
          // console.log('res.body.data.updateProject', res.body.data.updateProject);
          res.should.have.status(200);
          res.body.data.updateProject.should.be.a('object');
          res.body.data.updateProject.name.should.equal('grease the wheels');
          res.body.data.updateProject.description.should.equal('Flank ribeye sirloin, rump bresaola beef pancetta short ribs porchetta chuck frankfurter. Kevin ribeye meatball bresaola shank pork belly. Ham beef chicken ball tip, cow spare ribs biltong drumstick pork beef ribs.');
          res.body.data.updateProject.id.should.equal(3);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('deleteProject', () => {
    it('it should delete a project', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{deleteProject(id:4){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.deleteProject.should.be.a('object');
          if (err) console.log(err);
          done();
        });
    });
  });
}); // end testing block
