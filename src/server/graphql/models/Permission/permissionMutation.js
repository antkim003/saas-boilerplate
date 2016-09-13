import {GraphQLString, GraphQLNonNull, GraphQLInt} from 'graphql';
import {Permission} from './permissionSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  createPermission: {
    type: Permission,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(source, args) {
      let createdPermission = await Db.models.permission.create({
        name: args.name.toLowerCase()
      });
      return createdPermission;
    }
  },
  updatePermission: {
    type: Permission,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(source, args) {
      const permissionFound = await Db.models.permission.findById(args.id);
      let updatedPermission = await permissionFound.update({name: args.name.toLowerCase()});
      if (updatedPermission.error) console.error(updatedPermission.error);
      return updatedPermission;
    }
  },
  deletePermission: {
    type: Permission,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const permissionFound = await Db.models.permission.findById(args.id);
      return permissionFound.destroy();
    }
  }
};
