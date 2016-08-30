import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import Db from '../../../database/setupDB.js'

export const User  = new GraphQLObjectType({
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
      username: {
        type: GraphQLString,
        resolve(user) {
          return user.username;
        }
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.password;
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email
        }
      },
      isVerified: {
        type: GraphQLBoolean,
        resolve(user) {
          return user.isVerified
        }
      },
      permission: {
        type: Permission,
        resolve(user) {
          return user.getPermission();
        }
      }
    }
  }
});

export const Permission = new GraphQLObjectType({
  name: 'Permission',
  description: "This is the permissions of a user",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      userType: {
        type: GraphQLString,
        resolve(permission) {
          return permission.userType;
        }
      }
    }
  }
});
