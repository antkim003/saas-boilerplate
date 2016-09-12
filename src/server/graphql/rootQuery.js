import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';
import article from './models/Article/articleQuery';
import usertype from './models/UserType/userTypeQuery';
import permission from './models/Permission/permissionQuery';

const rootFields = Object.assign(user, article, usertype, permission);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
