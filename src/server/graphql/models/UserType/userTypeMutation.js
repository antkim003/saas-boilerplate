import {GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt, GraphQLInputObjectType} from 'graphql';
import {Usertype} from './userTypeSchema.js';
import Promise from 'bluebird';

let permissionsName = new GraphQLInputObjectType(
  {
    name: "permissionsInputString",
    description: 'Used when inputting permissions',
    fields: () => ({
      name: {type: GraphQLString}
    })
  }
);

import Db from '../../../database/setupDB.js';

export default {
  createUserType: {
    type: Usertype,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      permissions: {
        type: new GraphQLList(permissionsName)
      }
    },
    async resolve(source, args) {
      let createdUserType = await Db.models.usertype.create({
        name: args.name.toLowerCase()
      });
      if (args.permissions !== undefined) {
        createdUserType = await setPermissions(args.permissions, createdUserType)
      }
      return createdUserType;
    }
  },
  updateUserType: {
    type: Usertype,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: GraphQLString
      },
      permissions: {
        type: new GraphQLList(permissionsName)
      }
    },
    async resolve(source, args) {
      const usertypeById = await Db.models.usertype.findById(args.id);
      let usertypePreviousInfo = {
        name: usertypeById.name
      };
      if (args.name !== undefined) {
        usertypePreviousInfo.name = args.name.toLowerCase();
      }
      let updatedUserType = await usertypeById.update(usertypePreviousInfo);
      if (updatedUserType.error) console.error(updatedUserType.error);
      console.log('usertype was updated');
      // now add permissions
      if (args.permissions !== undefined) {
        updatedUserType = await setPermissions(args.permissions, updatedUserType)
      }
      return updatedUserType;
    }
  },
  deleteUserType: {
    type: Usertype,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const userTypeById = await Db.models.usertype.findById(args.id);
      return userTypeById.destroy();
    }
  }
};

async function setPermissions(argsPermissions, updatedUserType) {
  let foundPermissions = [];
  let promiseArray = [];
  for (let i = 0; i < argsPermissions.length; i++) {
    promiseArray.push(Db.models.permission.find({where: {name: argsPermissions[i].name}}))
  }
  foundPermissions = await Promise.each(promiseArray, () => {
  });
  await updatedUserType.setPermissions(foundPermissions);
  const checkPermissions = await updatedUserType.getPermissions();
  let permissionsNames = [];
  checkPermissions.forEach(permission => {
    permissionsNames.push(permission.name);
  })
  console.log('the updated user type now has permissions:', permissionsNames);
  return updatedUserType;
}
