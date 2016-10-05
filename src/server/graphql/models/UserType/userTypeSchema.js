import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {Permission} from '../Permission/permissionSchema.js'

export const Usertype = new GraphQLObjectType({
  name: "Usertype",
  description: "This represents the kind of user, admin, developer, etc.",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(usertype) {
          return usertype.id;
        }
      },
      name: {
        type: GraphQLString,
        describe: "The usertype name",
        resolve(usertype) {
          return usertype.name;
        }
      },
      permissions: {
        type: new GraphQLList(Permission),
        describe: "The permissions on the usertype",
        resolve(usertype) {
          return usertype.getPermissions();
        }
      }
    };
  }
}
);
