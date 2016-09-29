import {GraphQLObjectType} from 'graphql';
import user from './models/User/userQuery';
import usertype from './models/UserType/userTypeQuery';
import permission from './models/Permission/permissionQuery';
import project from './models/Project/projectQuery';
import category from './models/Category/categoryQuery';
import datatype from './models/Datatype/datatypeQuery';
import asset from './models/Asset/assetQuery';

const rootFields = Object.assign(user, asset, usertype, permission, project, category, datatype);
export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => rootFields
});
