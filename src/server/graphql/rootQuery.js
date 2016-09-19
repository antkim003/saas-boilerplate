import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';
import article from './models/Article/articleQuery';
import usertype from './models/UserType/userTypeQuery';
import permission from './models/Permission/permissionQuery';
import project from './models/Project/projectQuery';


const rootFields = Object.assign(user, article, usertype, permission, project);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
