import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import {Field} from '../Field/fieldSchema.js'

export const Datatype = new GraphQLObjectType({
  name: 'Datatype',
  description: "This is a datatype",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(datatype) {
          return datatype.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(datatype) {
          return datatype.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(datatype) {
          return datatype.description;
        }
      },
      visible: {
        type: GraphQLBoolean,
        resolve(datatype) {
          return datatype.visible;
        }
      },
      fields: {
        type: new GraphQLList(Field),
        resolve(datatype) {
          return datatype.getFields();
        }
      }
    };
  }
});
