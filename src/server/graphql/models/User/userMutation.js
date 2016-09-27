import {GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLInt} from 'graphql';
import {GraphQLEmailType,GraphQLPasswordType} from '../types';

import Db from '../../../database/setupDB.js';
import {User, UserWithAuthToken} from './userSchema.js';

import {getUserByEmail, signJwt, getAltLoginMessage, makeSecretToken} from './helpers';
import {errorObj} from '../utils';
import validateSecretToken from '../../../../universal/utils/validateSecretToken';
import {isLoggedIn} from '../authorization';
import promisify from 'es6-promisify';
import bcrypt from 'bcrypt';
import uuid from 'node-uuid';

const compare = promisify(bcrypt.compare);
const hash = promisify(bcrypt.hash);

export default {
  createUser: {
    type: UserWithAuthToken,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      active: {
        type: new GraphQLNonNull(GraphQLBoolean)
      },
      usertype: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, {name, email, password, active, usertype}) {
      const user = await getUserByEmail(email);
      if (user) {
        console.log('user exists', user);
        const hashedPassword = user.password;

        if (!hashedPassword) {
          throw errorObj({_error: "incorrect password"})
        }
        const isCorrectPass = await compare(password, hashedPassword);
        if (isCorrectPass) {
          const authToken = signJwt({id: user.id});
          return {authToken, user};
          throw errorObj({_error: 'Cannot create account', email: 'Email already exists'});
        }
      } else {
        // production should use 12+, but it's slow for dev
        const newHashedPassword = await hash(password, 10);
        const id = uuid.v4();
        const userDoc = {
          email: email,
          name: name,
          password: newHashedPassword,
          active: active
        };

        const newUser = await Db.models.user.create(userDoc);
        const userWithUserType = await newUser.addUserType(usertype);
        if (!newUser) {
          throw errorObj({_error: 'Could not create account, please try again'});
        }
        const authToken = signJwt({id});
        return {user: userWithUserType, authToken: authToken};
      }
    }
  },
  updateUser: {
    type: User,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      usertype: {
        type: GraphQLInt
      },
      active: {
        type: GraphQLBoolean
      },
      name: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      console.log('args.name', args.name);
      const userById = await Db.models.user.findById(args.id);
      let userPreviousInfo = {
        email: userById.email,
        password: userById.password,
        active: userById.active,
        usertypeId: userById.usertypeId,
        name: userById.name
      };
      if (args.email !== undefined) {
        userPreviousInfo.email = args.email.toLowerCase();
      }
      if (args.name !== undefined) {
        userPreviousInfo.name = args.name;
      }
      if (args.password !== undefined) {
        const newHashedPassword = await hash(args.password, 10);
        userPreviousInfo.password = newHashedPassword;
      }
      if (args.active !== undefined) {
        userPreviousInfo.active = args.active;
      }
      let updatedUser = await userById.update(userPreviousInfo);
      if (args.usertype !== undefined) {
        updatedUser = await updatedUser.addUserType(args.usertype);
      }

      if (updatedUser.error) console.error(updatedUser.error);
      return updatedUser;
    }
  },
  deleteUser: {
    type: User,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const userById = await Db.models.user.findById(args.id);
      userById.destroy();
      return userById;
    }
  }
};
