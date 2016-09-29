import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean} from 'graphql';
import {Category} from './categorySchema.js';

import Db from '../../../database/setupDB.js';
import {Datatype} from '../Datatype/datatypeSchema';

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
      },
      datatype: {
        type: GraphQLInt
      }
    },
    async resolve(source, args) {
      const categoryFound = await Db.models.category.findById(args.id);
      let categoryFoundEdits = {};
      if (args.name !== undefined) {
        categoryFoundEdits.name = args.name;
      } else {
        categoryFoundEdits.name = categoryFound.name;
      }
      if (args.visible !== undefined) {
        categoryFoundEdits.visible = args.visible;
      } else {
        categoryFoundEdits.visible = categoryFound.visible;
      }
      let updatedCategory = await categoryFound.update(categoryFoundEdits);
      if (updatedCategory.error) console.error(updatedCategory.error);
      if (args.datatype !== undefined) {
        let datatypeFound = await Db.models.datatype.findById(args.datatype);
        let categoryWithDatatype = await updatedCategory.setDatatype(datatypeFound);
        let savedCategory = await updatedCategory.save();
        return savedCategory;
      }
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
