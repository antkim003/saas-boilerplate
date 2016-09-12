import {
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

import {Permission} from './permissionSchema.js';

import Db from '../../../database/setupDB.js';

export default {

  getAllPermissionsBy: {
    type: new GraphQLList(Permission),
    args: {
      id: {type: GraphQLID},
      name: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.permission.findAll({where: args});
    }
  }
};
