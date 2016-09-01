import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';
import article from './models/Article/articleQuery';


const rootFields = Object.assign(user, article);
console.log('user >>>>>>', user);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
