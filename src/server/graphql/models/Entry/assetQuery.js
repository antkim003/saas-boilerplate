import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {Asset} from './assetSchema.js';

import Db from '../../../database/setupDB.js';

export default {

  getAllAssetsBy: {
    type: new GraphQLList(Asset),
    args: {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      description: {type: GraphQLString},
      url: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.asset.findAll({where: args});
    }
  },
  getAssetById: {
    type: Asset,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const asset = await Db.models.asset.findById(args.id);
      return asset;
    }
  },
  getAllAssets: {
    type: new GraphQLList(Asset),
    args: {
    },
    async resolve(root, args) {
      const assets = await Db.models.asset.findAll();
      return assets;
    }
  }
};
