import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
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
  },
  getPermissionById: {
    type: Permission,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const permission = await Db.models.permission.findById(args.id);
      return permission;
    }
  },
  getAllPermissions: {
    type: new GraphQLList(Permission),
    args: {
    },
    async resolve(root, args) {
      const permissions = await Db.models.permission.findAll();
      return permissions;
    }
  }
};
