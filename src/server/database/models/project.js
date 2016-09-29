import Conn from '../_db';
import Sequelize from 'sequelize';
// import {Category} from './category.js';
// console.log('Category in here', Category);

export const Project = Conn.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}
);
