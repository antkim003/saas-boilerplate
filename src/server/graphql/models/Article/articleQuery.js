import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import Db from '../../../database/setupDB.js';
import {Article} from './articleSchema.js';

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
  getAllArticles: {
    type: new GraphQLList(Article),
    args: {
    },
    resolve(root, args) {
      console.log(args);
      return Db.models.article.findAll({where: {}});
    }
  },
  getArticlesById: {
    type: Article,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(root, args) {
      return Db.models.article.findById(args.id);
    }
  }
};
