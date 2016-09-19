/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();// eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Graphql Category route testing', () => {
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

  describe('getAllCategories', () => {
    it('it should get all the categories', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "{getAllCategories{id,name,visible}}"
        })
        .end((err, res) => {
          // console.log('res.body.data.getAllCategories', res.body.data.getAllCategories);
          const categories = res.body.data.getAllCategories;
          res.should.have.status(200);
          categories.should.be.a('array');
          categories.length.should.equal(6);
          categories[0].should.have.property('name');
          categories[1].should.have.property('visible');
          categories[0].should.have.property('id');
          categories[0].name.should.be.a('string');
          categories[1].visible.should.be.a('boolean');
          // categories[4].visible.should.equal(true);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('getCategoryById', () => {
    it('it should get a category by id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getCategoryById(id:1){id,name,visible}}"
        })
        .end((err, res) => {
          const category = res.body.data.getCategoryById;
          res.should.have.status(200);
          category.should.be.a('object');
          category.should.have.property('name');
          category.should.have.property('visible');
          category.should.have.property('id');
          category.name.should.be.a('string');
          category.visible.should.be.a('boolean');
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('getCategoryProject', () => {
    it('it should get a categorys projects by the category id', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: "query{getCategoryProject(id:1){id,name}}"
        })
        .end((err, res) => {
          const project = res.body.data.getCategoryProject;
          res.should.have.status(200);
          project.should.be.a('object');
          project.should.have.property('name');
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('createCategory', () => {
    it('it should create a category', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        // query: 'mutation{createCategory(name:"burn"){id,name}}'
        .send({
          query: 'mutation{createCategory(name:"Cat Fancier Info",visible:true){id,name,visible}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          // console.log('res.body.data.createCategory', res.body.data.createCategory);
          res.body.data.createCategory.name.should.equal('cat fancier info');
          res.body.data.createCategory.visible.should.equal(true);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('updateCategory', () => {
    it('it should update a category', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{updateCategory(id:4,name:"grease the wheels",visible:false){id,name,visible}}'
        })
        .end((err, res) => {
          // console.log('res.body.data.updateCategory', res.body.data.updateCategory);
          res.should.have.status(200);
          res.body.data.updateCategory.should.be.a('object');
          res.body.data.updateCategory.name.should.equal('grease the wheels');
          res.body.data.updateCategory.visible.should.equal(false);
          res.body.data.updateCategory.id.should.equal(4);
          if (err) console.log(err);
          done();
        });
    });
  });
  describe('deleteCategory', () => {
    it('it should delete a category', done => {
      chai.request('http://localhost:3000')
        .post('/graphql')
        .set({Authorization: `Bearer ${authToken}`})
        .send({
          query: 'mutation{deleteCategory(id:4){id,name}}'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.deleteCategory.should.be.a('object');
          if (err) console.log(err);
          done();
        });
    });
  });
}); // end testing block
