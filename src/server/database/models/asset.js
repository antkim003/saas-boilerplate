import Conn from '../_db';
import Sequelize from 'sequelize';

export const Asset = Conn.define('asset', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}
);
