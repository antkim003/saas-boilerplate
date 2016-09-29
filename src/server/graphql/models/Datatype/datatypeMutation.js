import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean} from 'graphql';
import {Datatype} from './datatypeSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  createDatatype: {
    type: Datatype,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      visible: {
        type: GraphQLBoolean
      },
      description: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      const createdDatatype = await Db.models.datatype.create({
        name: args.name.toLowerCase(),
        visible: args.visible,
        description: args.description
      });
      return createdDatatype;
    }
  },
  updateDatatype: {
    type: Datatype,
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
      description: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      const {err, datatypeFound} = await Db.models.datatype.findById(args.id);
      if (err) {
        console.error(err);
        return datatypeFound;
      }
      const {_err, updatedDatatype} = await datatypeFound.update(args);
      if (_err) {
        console.error(err);
      }
      return updatedDatatype;
    }
  },
  deleteDatatype: {
    type: Datatype,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const datatypeFound = await Db.models.datatype.findById(args.id);
      return datatypeFound.destroy();
    }
  }
};
