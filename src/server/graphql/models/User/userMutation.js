import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import Db from '../../../database/setupDB.js';
import {User, Permission} from './userSchema.js';

export default {
  createUser: {
    type: User,
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
    resolve(_,args) {
      return Db.models.person.create({
        username: args.username,
        email: args.email.toLowerCase(),
        password: args.password
      })
    }
  }
}
