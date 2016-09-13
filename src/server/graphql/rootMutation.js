import {GraphQLObjectType} from 'graphql';
import user from './models/User/userMutation';
import usertype from './models/UserType/userTypeMutation';
import permission from './models/Permission/permissionMutation';

const rootFields = Object.assign(user, usertype, permission);

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields
});
