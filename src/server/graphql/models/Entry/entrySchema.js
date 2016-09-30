import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
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
        type: GraphQLInt,
        resolve(entry) {
          return entry.projectId;
        }
      },
      datatypeId: {
        type: GraphQLInt,
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
      },
      categoryId: {
        type: GraphQLInt,
        resolve(entry) {
          return entry.categoryId;
        }
      }
    };
  }
});
