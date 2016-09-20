import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean} from 'graphql';
import {Category} from './categorySchema.js';

import Db from '../../../database/setupDB.js';

export default {
  createCategory: {
    type: Category,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      visible: {
        type: GraphQLBoolean
      }
    },
    async resolve(source, args) {
      const createdCategory = await Db.models.category.create({
        name: args.name.toLowerCase(),
        visible: args.visible
      });
      return createdCategory;
    }
  },
  updateCategory: {
    type: Category,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: GraphQLString
      },
      visible: {
        type: GraphQLBoolean
      }
    },
    async resolve(source, args) {
      const categoryFound = await Db.models.category.findById(args.id);
      let categoryFoundEdits = {};
      if (args.name) {
        categoryFoundEdits.name = args.name
      } else {
        categoryFoundEdits.name = categoryFound.name
      }
      if (args.visible !== undefined) {
        categoryFoundEdits.visible = args.visible
      } else {
        categoryFoundEdits.visible = categoryFound.visible
      }
      const updatedCategory = await categoryFound.update(categoryFoundEdits);
      if (updatedCategory.error) console.error(updatedCategory.error);
      return updatedCategory;
    }
  },
  deleteCategory: {
    type: Category,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const categoryFound = await Db.models.category.findById(args.id);
      return categoryFound.destroy();
    }
  }
};
