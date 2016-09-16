import Conn from '../_db';
import Sequelize from 'sequelize';

export const Datatype = Conn.define('datatype', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  visible: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  fields: {
    type: Sequelize.JSON,
    allowNull: true
  }
}
);
