import {GraphQLString, GraphQLNonNull, GraphQLInt} from 'graphql';
import {Field} from './fieldSchema.js';

import Db from '../../../database/setupDB.js';

export default {
  createField: {
    type: Field,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      }
    },
    async resolve(source, args) {
      const createdField = await Db.models.field.create({
        name: args.name.toLowerCase(),
        description: args.description
      });
      return createdField;
    }
  },
  updateField: {
    type: Field,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      datatype: {
        type: GraphQLInt
      }
    },
    async resolve(source, args) {
      const fieldFound = await Db.models.field.findById(args.id);
      let fieldPrevInfo = {
        id: fieldFound.id,
        name: fieldFound.name,
        description: fieldFound.description
      };
      if (args.name !== undefined) {
        fieldPrevInfo.name = args.name;
      }
      if (args.description !== undefined) {
        fieldPrevInfo.description = args.description;
      }
      const updatedField = await fieldFound.update(fieldPrevInfo);
      if (updatedField.error) console.error(updatedField.error);
      if (args.datatype !== undefined) {
        let datatypeFound = await Db.models.datatype.findById(args.datatype);
        let fieldWithDatatype = await updatedField.setDatatype(datatypeFound);
        let savedField = await updatedField.save();
        return savedField;
      }
      return updatedField;
    }
  },
  deleteField: {
    type: Field,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const fieldFound = await Db.models.field.findById(args.id);
      return fieldFound.destroy();
    }
  }
};
