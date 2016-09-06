import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';
import article from './models/Article/articleQuery';

const rootFields = Object.assign(user, article);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
