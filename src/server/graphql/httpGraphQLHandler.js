import Schema from './rootSchema';
import {graphql} from 'graphql';

export default async (req, res) => {
  // Check for admin privileges
  console.log('req.user in server side ', req.user);
  const {query, variables, ...newContext} = req.body;
  const authToken = req.user || {};
  const context = {authToken, ...newContext};
  const result = await graphql(Schema, query, null, context, variables);
  if (result.errors) {
    console.log('DEBUG GraphQL Error:', result.errors);
  }
  res.send(result);
};
