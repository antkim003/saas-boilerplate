// put all of our sequelize model schemas here

import {User, Usertype} from './user';
import {Article} from './article';
import {Project} from './project';
import {Category} from './category';



// User.belongsTo(Permission);
User.hasMany(Article);
Article.belongsTo(User);
User.belongsTo(Usertype);
Project.belongsToMany(User, {through: 'UsersToProjects'});
User.belongsToMany(Project, {through: 'UsersToProjects'});
// This will add methods getUsers, setUsers, addUser,addUsers to Project, and getProjects, setProjects, addProject, and addProjects to User.
// This will create a new model called UsersToProjects with the equivalent foreign keys projectId and userId.
Project.hasMany(Category);
// Category.hasMany(Entry);
// Category.hasOne(Datatype);
