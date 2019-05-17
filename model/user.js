/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'name'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        len: {
          args: [6, 100],
          msg: "Email address must be between 6 and 100 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'password',
      validate: {
        len: {
          args: [8, 256],
          msg: "Password must be between 8 and 256 characters in length"
        }
      }
    }
  }, {
    tableName: 'user',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['password'] },
      }
  });
};
