import {GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLInt,  GraphQLInputObjectType} from 'graphql';
import {GraphQLEmailType,GraphQLPasswordType} from '../types';
import {Usertype} from './userTypeSchema.js';

// let permissionsName = new GraphQLInputObjectType(
//   {
//     name: "permissionsInputString",
//     description: 'Used when inputting permissions',
//     fields: () => ({
//       name: {type: GraphQLString}
//     })
//   }
// );

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
      let foundPermissions = [];
      if (args.permissions !== undefined) {
        args.permissions.forEach(async permission => {
          const foundPermission = await Db.models.permission.find({where: {name: permission.name}});
          foundPermissions.push(foundPermission);
        });
      }
      const createdUserType = await Db.models.usertype.create({
        name: args.name.toLowerCase()
      });
      const doneAddingPermissions = await createdUserType.setPermissions(foundPermissions);
      return createdUserType;
    }
  //   updateUserType: {
  //     type: Usertype,
  //     args: {
  //       id: {
  //         type: new GraphQLNonNull(GraphQLInt)
  //       },
  //       name: {
  //         type: GraphQLString
  //       }
  //     },
  //     async resolve(source, args) {
  //       const userById = await Db.models.user.findById(args.id);
  //       let userPreviousInfo = {
  //       email: userById.email,
  //       password: userById.password,
  //       active: userById.active,
  //       usertypeId: userById.usertypeId
  //       };
  //       if (args.email !== undefined) {
  //       userPreviousInfo.email = args.email.toLowerCase();
  //     }
  //     if (args.password !== undefined) {
  //       const newHashedPassword = await hash(args.password, 10);
  //       userPreviousInfo.password = newHashedPassword;
  //     }
  //     if (args.active !== undefined) {
  //       userPreviousInfo.active = args.active;
  //     }
  //     let updatedUser = await userById.update(userPreviousInfo);
  //     if (args.usertype !== undefined) {
  //       updatedUser = await updatedUser.addUserType(args.usertype);
  //     }
  //
  //     if (updatedUser.error) console.error(updatedUser.error);
  //     console.log('user was updated: ', updatedUser);
  //     return updatedUser;
  //   }
  // }
  // deleteUser: {
  //   type: User,
  //   args: {
  //     id: {
  //       type: new GraphQLNonNull(GraphQLInt)
  //     }
  //   },
  //   async resolve(source, args) {
  //     const userById = await Db.models.user.findById(args.id);
  //     return userById.destroy();
  //   }
  // }
  }
};
