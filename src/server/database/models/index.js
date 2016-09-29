// put all of our sequelize model schemas here
import {User, Usertype} from './user';
import {Project} from './project';
import {Category} from './category';
import {Datatype} from './datatype';
import {Field} from './field';
import {Asset} from './asset';

User.belongsTo(Usertype);
Project.belongsToMany(User, {through: 'UsersToProjects'});
User.belongsToMany(Project, {through: 'UsersToProjects'});
// This will add methods getUsers, setUsers, addUser,addUsers to Project, and getProjects, setProjects, addProject, and addProjects to User.
// This will create a new model called UsersToProjects with the equivalent foreign keys projectId and userId.
Project.hasMany(Category);
// Datatype.belongsTo(Category);
// Category.hasMany(Entry);
Category.hasOne(Datatype);
Field.belongsToMany(Datatype, {through: 'FieldsToDatatypes'});
Datatype.belongsToMany(Field, {through: 'FieldsToDatatypes'});
// This will add methods getDatatype, setDatatype, addDatatype,addDatatype to Field, and getFields, setFields, addFields, and addField to Datatype.
// This will create a new model called FieldsToDatatypes with the equivalent foreign keys datatypeId and fieldId.
// console.log('Category.prototype!!', Category.prototype);
// Category.prototype.getDatatype = function () {
//   const Id = this.get('id');
//   // console.log('models', models);
//   return models.Datatype.find({where: {categoryId: Id}})
//   .then(datatype => {
//     console.log('datatype in instanceMethods', datatype);
//     return datatype;
//   });
// };
