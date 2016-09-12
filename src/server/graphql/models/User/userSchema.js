import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';
// import Db from '../../../database/setupDB.js'

export const User = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      password: {
        type: GraphQLString,
        describe: "Hashed password",
        resolve: () => null
      },
      email: {
        type: GraphQLString,
        describe: "The email address",
        resolve(user) {
          return user.email;
        }
      },
      usertype: {
        type: GraphQLString,
        describe: "User type retrieved through helper function",
        resolve(user) {
          return user.getUserType()
          .then(usertype => {
            return usertype.dataValues.name;
          });
        }
      },
      permissions: {
        type: new GraphQLList(GraphQLString),
        describe: "Permissions retrieved through helper function",
        resolve(user) {
          return user.getPermissions()
          .then(permissionsFound => {
            console.log('permissionsFound', permissionsFound);
            return permissionsFound;
          });
        }
      },
      active: {
        type: GraphQLBoolean,
        describe: "User is active or not",
        resolve(user) {
          return user.active;
        }
      }
      // isVerified: {
      //   type: GraphQLBoolean,
      //   resolve(user) {
      //     return user.isVerified;
      //   }
      // },
      // permission: {
      //   type: Permission,
      //   resolve(user) {
      //     return user.getPermission();
        // }
      // }
    };
  }
});

export const UserWithAuthToken = new GraphQLObjectType({
  name: 'UserWithAuthToken',
  description: "The user with an optional auth token",
  fields: () => ({
    user: {type: User, description: 'The user account'},
    authToken: {type: GraphQLString, description: 'The auth token to allow for quick login'}
  })
});

// export const Permission = new GraphQLObjectType({
//   name: 'Permission',
//   description: "This is the permissions of a user",
//   fields: () => {
//     return {
//       id: {
//         type: GraphQLInt,
//         resolve(user) {
//           return user.id;
//         }
//       },
//       userType: {
//         type: GraphQLString,
//         resolve(permission) {
//           return permission.userType;
//         }
//       }
//     };
//   }
// });
