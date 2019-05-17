/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usersRoles', {
    usersRolesId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'users_roles_id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'role_id'
    }
  }, {
    tableName: 'users_roles',
    timestamps: false,
  });
};
