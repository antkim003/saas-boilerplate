import {GraphQLObjectType} from 'graphql';
import user from './models/User/userMutation';
import usertype from './models/UserType/userTypeMutation';


const rootFields = Object.assign(user, usertype);

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields
});
