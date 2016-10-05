import {GraphQLString, GraphQLNonNull, GraphQLInt} from 'graphql';
import {Project} from './projectSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  createProject: {
    type: Project,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      const createdProject = await Db.models.project.create({
        name: args.name,
        description: args.description
      });
      return createdProject;
    }
  },
  updateProject: {
    type: Project,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      const projectFound = await Db.models.project.findById(args.id);
      const updatedProject = await projectFound.update({name: args.name});
      if (updatedProject.error) console.error(updatedProject.error);
      return updatedProject;
    }
  },
  deleteProject: {
    type: Project,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const projectFound = await Db.models.project.findById(args.id);
      return projectFound.destroy();
    }
  }
};
