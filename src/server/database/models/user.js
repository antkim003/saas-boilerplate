import Conn from '../_db'
import Sequelize from 'sequelize'

export const User = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

export const Permission = Conn.define('permission', {
  userType: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
