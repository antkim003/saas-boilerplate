// put all of our sequelize model schemas here

import {User, Usertype} from './user';
import {Article} from './article';

// User.belongsTo(Permission);
User.hasMany(Article);
Article.belongsTo(User);
User.belongsTo(Usertype);
