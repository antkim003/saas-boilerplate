import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import {Datatype} from '../Datatype/datatypeSchema';
import {Entry} from '../Entry/entrySchema';

export const Category = new GraphQLObjectType({
  name: 'Category',
  description: "This is a category",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(category) {
          return category.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(category) {
          return category.name;
        }
      },
      visible: {
        type: GraphQLBoolean,
        resolve(category) {
          return category.visible;
        }
      },
      datatype: {
        type: Datatype,
        resolve(category) {
          return category.getDatatype();
        }
      },
      entries: {
        type: new GraphQLList(Entry),
        resolve(category) {
          return category.getEntriesMethod();
        }
      }
    };
  }
});
