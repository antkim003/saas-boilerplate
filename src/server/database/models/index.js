// put all of our sequelize model schemas here

import {User, Usertype} from './user';
import {Article} from './article';

// User.belongsTo(Permission);
User.hasMany(Article);
Article.belongsTo(User);
// Usertype.hasOne(User);
// User.belongsTo(Usertype);
// Usertype.hasMany(User);
// Usertype.belongsToMany(User);
User.belongsTo(Usertype);
