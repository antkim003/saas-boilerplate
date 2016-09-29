import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {Datatype} from './datatypeSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  getDatatypeById: {
    type: Datatype,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const datatype = await Db.models.datatype.findById(args.id);
      return datatype;
    }
  },
  getAllDatatypes: {
    type: new GraphQLList(Datatype),
    async resolve() {
      const datatypes = await Db.models.datatype.findAll();
      return datatypes;
    }
  }
};
