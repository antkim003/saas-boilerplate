import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
// import Db from '../../../database/setupDB.js'
import {User} from '../User/userSchema.js'

export const Article  = new GraphQLObjectType({
  name: "Article",
  description: "This represents an Article",
  fields: () => {
    return {
      title: {
        type: GraphQLString,
        describe: "This is the title of the article",
        resolve(article) {
          return article.title;
        }
      },
      headline: {
        type: GraphQLString,
        describe: "This is the headline of the article",
        resolve(article) {
          return article.headline;
        }
      },
      body: {
        type: GraphQLString,
        describe: "This is the body of the article",
        resolve(article) {
          return article.body;
        }
      },
      author: {
        type: User,
        describe: "This is the author of the article",
        resolve (article) {
            return article.getUser()
        }
}
    }
  }
});
