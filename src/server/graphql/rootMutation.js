import {GraphQLObjectType} from 'graphql';
import user from './models/User/userMutation';
import usertype from './models/UserType/userTypeMutation';
import permission from './models/Permission/permissionMutation';
import project from './models/Project/projectMutation';
import category from './models/Category/categoryMutation';

const rootFields = Object.assign(user, usertype, permission, project, category);

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields
});
