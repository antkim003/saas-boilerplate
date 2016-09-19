import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

export const Category = new GraphQLObjectType({
  name: 'Category',
  description: "This is a category",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(category) {
          return category.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(category) {
          return category.name;
        }
      },
      visible: {
        type: GraphQLBoolean,
        resolve(category) {
          return category.visible
        }
      }
    };
  }
});
