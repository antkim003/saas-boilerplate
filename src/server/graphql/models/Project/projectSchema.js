import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export const Project = new GraphQLObjectType({
  name: 'Project',
  description: "This is a project",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(project) {
          return project.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(project) {
          return project.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(project) {
          return project.description;
        }
      }
    };
  }
});
