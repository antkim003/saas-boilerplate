import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export const Asset = new GraphQLObjectType({
  name: 'Asset',
  description: "This is an asset",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(asset) {
          return asset.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(asset) {
          return asset.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(asset) {
          return asset.description;
        }
      },
      url: {
        type: GraphQLString,
        resolve(asset) {
          return asset.url;
        }
      }
    };
  }
});
