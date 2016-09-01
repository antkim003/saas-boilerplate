////John practice code below
import Conn from '../_db'
import Sequelize from 'sequelize'
// const User = Conn.models.User

export const Article = Conn.define('article', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  headline: {
    type: Sequelize.TEXT,
  },
  body: {
    type: Sequelize.TEXT
  }
});
