import {GraphQLString,GraphQLNonNull,GraphQLBoolean} from 'graphql';
import {GraphQLEmailType,GraphQLPasswordType} from '../types';

import Db from '../../../database/setupDB.js';
import {User, Permission, UserWithAuthToken} from './userSchema.js';

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
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(source,{username, email, password}) {
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
          username: username,
          password: newHashedPassword
        };

        const newUser = await Db.models.user.create(userDoc);
        if (!newUser) {
          throw errorObj({_error: 'Could not create account, please try again'});
        }
        const authToken = signJwt({id});
        return {user: userDoc}
      }
      // return Db.models.person.create({
      //   username: args.username,
      //   email: args.email.toLowerCase(),
      //   password: args.password
      // })
    }
  }
}
