/* eslint-disable no-undef */
// import {seed} from '../../seed';
import {expect} from 'chai';
import {graphql} from 'graphql';
import Schema from '../../src/server/graphql/rootSchema';

describe('Graphql Permissions route testing without using chai http', () => {
  // auth token cache this is working like localStorage would on our clientside
  let authToken = '';
  // before(done => {
  //   seed().then(done, done);
  // });
  // logging in here for authentication
  it('logged in', async () => {
    const query = `
      query {
          user: login(
            email: "admin123@gmail.com",
            password: "password"
          )
          {
            authToken
          }
      }
    `;
    const authTokenResponse = await graphql(Schema, query);
    console.log('it worked', authTokenResponse);
    authToken = authTokenResponse.data.user.authToken;
    console.log('authToken', authTokenResponse.data.user.authToken, authToken);
    expect(authToken).to.exist;
  });
  // logging out after each login.
  afterEach(done => {
    authToken = '';
    done();
  });
  describe('getAllPermissions using GraphQL', () => {
    it('it should get all the permissions when passing JWT token', async () => {
      const query = `
        query {
          permissions: getAllPermissions{
            id,
            name
          }
        }
      `;
      const actual = await graphql(Schema, query);
      const allPermissions = actual.data.permissions;
      expect(allPermissions.length).to.equal(4);
      expect(allPermissions[1].name).to.equal('write');
      expect(allPermissions[2].name).to.equal('modify');
    });
  });
}); // end testing block
