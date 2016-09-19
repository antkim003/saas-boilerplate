import {GraphQLObjectType} from 'graphql';
import user from './models/User/userMutation';
import usertype from './models/UserType/userTypeMutation';
import permission from './models/Permission/permissionMutation';
import project from './models/Project/projectMutation';

const rootFields = Object.assign(user, usertype, permission, project);

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields
});
