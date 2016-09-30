import Conn from '../_db';
import Sequelize from 'sequelize';

export const Entry = Conn.define('entry', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  datatypeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  visible: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  data: {
    type: Sequelize.JSON,
    allowNull: true
  }
}
);
