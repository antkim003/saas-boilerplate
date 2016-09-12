import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export const Permission = new GraphQLObjectType({
  name: 'Permission',
  description: "This is a permission",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(permission) {
          return permission.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(permission) {
          return permission.name;
        }
      }
    };
  }
});
