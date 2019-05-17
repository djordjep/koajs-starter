/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'role_id'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'name'
    }
  }, {
    tableName: 'role',
    timestamps: false,
  });
};
