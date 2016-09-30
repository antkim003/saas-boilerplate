import Conn from '../_db';
import Sequelize from 'sequelize';

export const Category = Conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  visible: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
},
  {
    instanceMethods: {
      getDatatype: function () {// eslint-disable-line babel/object-shorthand
        const Id = this.get('id');
        return models.Datatype.find({where: {categoryId: Id}})
        .then(datatype => {
          return datatype;
        });
      },
      getEntries: function () {// eslint-disable-line babel/object-shorthand
        const Id = this.get('id');
        return models.Entry.find({where: {categoryId: Id}})
        .then(entries => {
          console.log('entries in instanceMethods', entries);
          return entries;
        });
      }
    }
  }
);
