mocha test/graphql/graphql.permission.noServer.test.js --compilers js:babel-core/register --require babel-polyfill

describe('getPermissionById', () => {
  it('it should get a permission by id', done => {
    chai.request('http://localhost:3000')
      .post('/graphql')
      .set({Authorization: `Bearer ${authToken}`})
      .send({
        query: "query{getPermissionById(id:2){id,name}}"
      })
      .end((err, res) => {
        res.should.have.status(200);
        // console.log('res.body.data.getPermissionById', res.body.data.getPermissionById);
        res.body.data.getPermissionById.name.should.equal('write');
        res.body.data.getPermissionById.id.should.equal(2);
        if (err) console.log(err);
        done();
      });
  });
});
