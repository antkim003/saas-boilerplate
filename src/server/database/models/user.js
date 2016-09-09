import Conn from '../_db';
import Sequelize from 'sequelize';

export const Permission = Conn.define('permission', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export const Usertype = Conn.define('usertype', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export const User = Conn.define('user', {
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
  // type: {
  //   type: Sequelize.INTEGER
  // }
},
  {
    instanceMethods: {
      addUserType: function (id) {
        this.set('usertypeId', id);
        return this.save();
      },
      getUserType: function () {
        const usertypeId = this.get('usertypeId');
        return Usertype.find({attributes: ['name']}, {where: {id: usertypeId}});
      }
    }
  }

);

const UsertypesPermissions = Conn.define('usertypes_permissions', {
  role: Sequelize.STRING
});
Usertype.belongsToMany(Permission, {through: UsertypesPermissions});
Permission.belongsToMany(Usertype, {through: UsertypesPermissions});
