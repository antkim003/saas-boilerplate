import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql';
import {Datatype} from './datatypeSchema.js';
import promise from 'bluebird';

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
      },
      fields: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const createdDatatype = await Db.models.datatype.create(args);
      if (args.fields !== undefined){
        return fieldSetter(createdDatatype, args.fields);
      }
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
      },
      fields: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const datatypeFound = await Db.models.datatype.findById(args.id);
      let toUpdateDatatype = {};
      const keysArray = Object.keys(args);
      keysArray.forEach(key => {
        if ( (args[key] !== undefined) && key !== 'id' && key !== 'fields') {
          toUpdateDatatype[key] = args[key];
        }
      });
      const updatedField = await datatypeFound.update(toUpdateDatatype);
      if (updatedField.error) console.error(updatedField.error);
      if (args.fields !== undefined) {
        return fieldSetter(updatedField, args.fields);
      }
      return updatedField;
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
// utility function for setting datatypes
const fieldSetter = ((updatedDatatype, argsFields) => {
  const datatypePromises = [];
  for (let i = 0; i < argsFields.length; i++) {
    datatypePromises.push(Db.models.field.findById(argsFields[i]));
  }
  return promise.each(datatypePromises, () => {})
  .then(_foundDatatypes => {
    return updatedDatatype.setFields(_foundDatatypes);
  })
  .then(() => {
    return updatedDatatype.save();
  });
});
