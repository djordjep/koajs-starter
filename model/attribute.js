/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attribute', {
    attributeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'attribute_id'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name'
    }
  }, {
    tableName: 'attribute'
  });
};
