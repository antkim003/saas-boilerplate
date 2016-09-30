import {GraphQLObjectType} from 'graphql';
import user from './models/User/userMutation';
import usertype from './models/UserType/userTypeMutation';
import permission from './models/Permission/permissionMutation';
import project from './models/Project/projectMutation';
import category from './models/Category/categoryMutation';
import datatype from './models/Datatype/datatypeMutation';
import asset from './models/Asset/assetMutation';
import field from './models/Field/fieldMutation';
import entry from './models/Entry/entryMutation';

const rootFields = Object.assign(user, usertype, permission, project, category, asset, datatype, field, entry);

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => rootFields
});
