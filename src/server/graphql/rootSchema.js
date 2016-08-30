import query from './rootQuery';
import mutation from './rootMutation';
// import subscription from './rootSubscription';
import {GraphQLSchema} from 'graphql';

console.log(`query : ${query}, mutation: ${mutation}`);

export default new GraphQLSchema({query, mutation});
