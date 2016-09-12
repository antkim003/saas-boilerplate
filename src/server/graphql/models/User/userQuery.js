import {
  // GraphQLObjectType,
  // GraphQLInt,
  GraphQLString,
  // GraphQLBoolean,
  GraphQLList,
  // GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import Db from '../../../database/setupDB.js';
import {User, UserWithAuthToken} from './userSchema.js';
import {Permission} from '../Permission/permissionSchema.js';
console.log('Permission!!!', Permission);
import {errorObj} from '../utils';
import {GraphQLEmailType, GraphQLPasswordType} from '../types';
import {getUserByEmail, signJwt, getAltLoginMessage} from './helpers';
import promisify from 'es6-promisify';
import bcrypt from 'bcrypt';
import {isAdminOrSelf} from '../authorization';

const compare = promisify(bcrypt.compare);

export default {

  getAllUsersBy: {
    type: new GraphQLList(User),
    args: {
      id: {type: GraphQLID},
      email: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.user.findAll({where: args});
    }
  },
  getUserById: {
    type: User,
    args : {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      let user = await Db.models.user.findById(args.id);
      return user;
    }
  },
  login: {
    type: UserWithAuthToken,
    args: {
      email: {type: new GraphQLNonNull(GraphQLEmailType)},
      password: {type: new GraphQLNonNull(GraphQLPasswordType)}
    },
    async resolve(source, args) {
      const {email, password} = args;
      const user = await getUserByEmail(email);
      if (!user) {
        throw errorObj({_error: 'User not found'})
      }
      const hashedPassword = user.password;
      if (!hashedPassword) {
        throw errorObj({_error: "Password doesn't exist"});
      }
      const isCorrectPass = await compare(password, hashedPassword);
      if (isCorrectPass) {
        const authToken = signJwt({id: user.id});
        return {authToken, user};
      }
      throw errorObj({_error: 'Login Failed', password: 'Incorrect password'})
    }
  },
  loginAuthToken: {
    type: User,
    async resolve(source, args, {authToken}) {
      const {id} = authToken;
      console.log(id);
      if (!id) {
        throw errorObj({_error: 'Invalid authentication token'});
      }
      const user = await Db.models.user.findById(id);
      if (!user) {
        throw errorObj({_error: "User not found"});
      }
      return user;
    }
  }
};
