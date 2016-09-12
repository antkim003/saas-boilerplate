import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export const Usertype = new GraphQLObjectType({
  name: "Usertype",
  description: "This represents the kind of user, admin, developer, etc.",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(usertype) {
          return usertype.id;
        }
      },
      name: {
        type: GraphQLString,
        describe: "Hashed password",
        resolve(usertype) {
          return usertype.name;
        }
      }
    };
  }
}
);
