import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import Db from '../../../database/setupDB.js';

import {Entry} from './entrySchema.js';

export default {
  createEntry: {
    type: Entry,
    args: {
      title: {type: new GraphQLNonNull(GraphQLString)},
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      datatypeId: {type: new GraphQLNonNull(GraphQLInt)},
      visible: {type: new GraphQLNonNull(GraphQLBoolean)},
      data: {type: GraphQLJSON},
      categoryId: {type: GraphQLInt}
    },
    async resolve(source, args) {
      const createdEntry = await Db.models.entry.create(args);
      return createdEntry;
    }
  },
  deleteEntry: {
    type: Entry,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const entryFound = await Db.models.entry.findById(args.id);
      return entryFound.destroy();
    }
  },
  updateEntry: {
    type: Entry,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)},
      title: {type: GraphQLString},
      projectId: {type: GraphQLInt},
      datatypeId: {type: GraphQLInt},
      visible: {type: GraphQLBoolean},
      data: {type: GraphQLJSON},
      categoryId: {type: GraphQLInt}
    },
    async resolve(source, args) {
      const entryFound = await Db.models.entry.findById(args.id);
      let toUpdateEntry = {};
      const keysArray = Object.keys(args);
      keysArray.forEach(key => {
        if ((args[key] !== undefined) && key !== 'id' && key !== 'categoryId') {
          toUpdateEntry[key] = args[key];
        }
      });
      const updatedEntry = await entryFound.update(toUpdateEntry);
      if (updatedEntry.error) console.error(updatedEntry.error);
      if (args.categoryId !== undefined) {
        updatedEntry.categoryId = args.categoryId;
        return await updatedEntry.save();
      }
      return updatedEntry;
    }
  }
};
