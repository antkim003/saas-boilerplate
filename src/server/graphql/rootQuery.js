import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';

const rootFields = Object.assign(user);
console.log('user >>>>>>', user);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
