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
      console.log('args in here!', args);
      const createdEntry = await Db.models.asset.create(args);
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
      const assetFound = await Db.models.asset.findById(args.id);
      return assetFound.destroy();
    }
  }
};
