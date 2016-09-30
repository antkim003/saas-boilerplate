import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLInteger,
  GraphQLBoolean
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

export const Entry = new GraphQLObjectType({
  name: 'Entry',
  description: "This is an entry",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(entry) {
          return entry.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(entry) {
          return entry.title;
        }
      },
      projectId: {
        type: GraphQLInteger,
        resolve(entry) {
          return entry.projectId;
        }
      },
      datatypeId: {
        type: GraphQLInteger,
        resolve(entry) {
          return entry.datatypeId;
        }
      },
      visible: {
        type: GraphQLBoolean,
        resolve(entry) {
          return entry.visible;
        }
      },
      data: {
        type: GraphQLJSON,
        resolve(entry) {
          return entry.data;
        }
      }
    };
  }
});
