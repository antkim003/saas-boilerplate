import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,

} from 'graphql';

import {Category} from './categorySchema.js';
import {Project} from '../Project/projectSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  getCategoryById: {
    type: Category,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const category = await Db.models.category.findById(args.id);
      return category;
    }
  },
  getAllCategories: {
    type: new GraphQLList(Category),
    args: {
    },
    async resolve(root, args) {
      const category = await Db.models.category.findAll();
      return category;
    }
  },
  getCategoryProject: {
    type: Project,
    description: "Gets the Project associated with a Category, takes the Category Id",
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const category = await Db.models.category.findById(args.id);
      const projectId = category.projectId;
      const project = await Db.models.project.findById(projectId)
      return project;
    }
  }
};
