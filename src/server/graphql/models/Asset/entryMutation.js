import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import Db from '../../../database/setupDB.js';

export default {
  createEntry: {
    type: Entry,
    args: {
      id: {type: new GraphQLNonNull(GraphQLInt)},
      title: {type: new GraphQLNonNull(GraphQLString)},
      projectId: {type: new GraphQLNonNull(GraphQLInt)},
      datatypeId: {type: new GraphQLNonNull(GraphQLInt)},
      visible: {type: new GraphQLNonNull(GraphQLBoolean)},
      data: {type: GraphQLJSON}
    },
    async resolve(source, args) {
      const createdEntry = await Db.models.asset.create({
        name: args.name.toLowerCase(),
        description: args.description,
        url: args.url
      });
      return createdEntry;
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
      data: {type: GraphQLJSON}
    },
    async resolve(source, args) {
      const assetFound = await Db.models.asset.findById(args.id);
      let assetPrevInfo = {
        id: assetFound.id,
        name: assetFound.name,
        description: assetFound.description,
        url: assetFound.url
      };
      if (args.name !== undefined) {
        assetPrevInfo.name = args.name;
      }
      if (args.description !== undefined) {
        assetPrevInfo.description = args.description;
      }
      if (args.url !== undefined) {
        assetPrevInfo.url = args.url;
      }
      const updatedEntry = await assetFound.update(assetPrevInfo);
      if (updatedEntry.error) console.error(updatedEntry.error);
      return updatedEntry;
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
