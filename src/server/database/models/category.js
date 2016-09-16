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
}
);
