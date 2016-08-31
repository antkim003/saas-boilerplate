import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import Db from '../../../database/setupDB.js';
import {User, Permission} from './userSchema.js';

export default {
  find: {
    type: new GraphQLList(User),
    args: {
      id: {type: GraphQLID},
      username: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.user.findAll({where: args});
    }
  },
  findById: {
    type: User,
    args : {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      let user = await Db.models.user.findById(args.id);
      return user;
    }
  },
  permissions: {
    type: new GraphQLList(Permission),
    resolve(root,args) {
      return Db.models.user.findAll({where:args});
    }
  }
}
