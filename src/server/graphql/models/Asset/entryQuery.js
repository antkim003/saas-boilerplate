import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import {Entry} from './entrySchema.js';

import Db from '../../../database/setupDB.js';

export default {

  getAllEntriesBy: {
    type: new GraphQLList(Entry),
    args: {
      id: {type: GraphQLID},
      title: {type: GraphQLString},
      projectId: {type: GraphQLInt},
      datatypeId: {type: GraphQLInt},
      visible: {type: GraphQLBoolean},
      data: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.entry.findAll({where: args});
    }
  },
  getEntryById: {
    type: Entry,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const entry = await Db.models.entry.findById(args.id);
      return entry;
    }
  },
  getAllEntries: {
    type: new GraphQLList(Entry),
    args: {
    },
    async resolve(root, args) {
      const entries = await Db.models.entry.findAll();
      return entries;
    }
  }
};
