import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {Project} from './projectSchema.js';
import {User} from '../User/userSchema.js';

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
  }
};