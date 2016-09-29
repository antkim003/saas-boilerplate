import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {Project} from './projectSchema.js';
import {User} from '../User/userSchema.js';
// import {Category} from '../Category/categorySchema.js';
import Db from '../../../database/setupDB.js';

export default {

  getAllProjectsBy: {
    type: new GraphQLList(Project),
    args: {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      description: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.project.findAll({where: args});
    }
  },
  getProjectById: {
    type: Project,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const project = await Db.models.project.findById(args.id);
      return project;
    }
  },
  getAllProjects: {
    type: new GraphQLList(Project),
    args: {
    },
    async resolve(root, args) {
      const projects = await Db.models.project.findAll();
      return projects;
    }
  },
  getProjectsUsersByProjectId: {
    type: new GraphQLList(User),
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const project = await Db.models.project.findById(args.id);
      const users = await project.getUsers();
      return users;
    }
  },
  getUsersProjectsById: {
    type: new GraphQLList(Project),
    description: "Get all projects for a user by entering user id",
    args: {
      id: {type: GraphQLID}
    },
    async resolve(root, args) {
      const foundUser = await Db.models.user.findById(args.id);
      const foundProjects = await foundUser.getProjects();
      console.log('foundProjects!!!', foundProjects);
      return foundProjects;
    }
  }
};
