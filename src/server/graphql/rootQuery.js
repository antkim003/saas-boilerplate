import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';
import article from './models/Article/articleQuery';
import usertype from './models/UserType/userTypeQuery';
import permission from './models/Permission/permissionQuery';
import project from './models/Project/projectQuery';
import category from './models/Category/categoryQuery';

const rootFields = Object.assign(user, article, usertype, permission, project, category);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
