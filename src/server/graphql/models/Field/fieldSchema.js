import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {Datatype} from '../Datatype/datatypeSchema';

export const Field = new GraphQLObjectType({
  name: 'Field',
  description: "This is an field",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(field) {
          return field.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(field) {
          return field.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(field) {
          return field.description;
        }
      },
      datatypes: {
        type: new GraphQLList(Datatype),
        resolve(field) {
          return field.getDatatypes();
        }
      }
    };
  }
});
