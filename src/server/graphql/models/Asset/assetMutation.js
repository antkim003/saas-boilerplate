import {GraphQLString, GraphQLNonNull, GraphQLInt} from 'graphql';
import {Asset} from './assetSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  createAsset: {
    type: Asset,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      url: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      const createdAsset = await Db.models.asset.create({
        name: args.name.toLowerCase(),
        description: args.description,
        url: args.url
      });
      return createdAsset;
    }
  },
  updateAsset: {
    type: Asset,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      url: {
        type: GraphQLString
      }
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
      const updatedAsset = await assetFound.update(assetPrevInfo);
      if (updatedAsset.error) console.error(updatedAsset.error);
      return updatedAsset;
    }
  },
  deleteAsset: {
    type: Asset,
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
