import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import Db from '../../../database/setupDB.js';
import {Article} from './articleSchema.js';
import {errorObj} from '../utils';
import promisify from 'es6-promisify';
import {isAdminOrSelf} from '../authorization';


export default {

  getAllArticlesBy: {
    type: new GraphQLList(Article),
    args: {
      id: {type: GraphQLID},
      title: {type: GraphQLString},
      headline: {type: GraphQLString},
      body: {type: GraphQLString},
      author: {type: GraphQLID}
    },
    resolve(root, args) {
      return Db.models.article.findAll({where: args});
    }
  },
  getArticlesById: {
    type: Article,
    args : {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
     resolve(root, args) {
      return Db.models.article.findById(args.id);
    }
  }
}
