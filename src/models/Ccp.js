const { Model, DataTypes } = require('sequelize');

class Ccp extends Model {
  static init(connection) {
    super.init({
      codigo: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      is_ccp: DataTypes.TINYINT,
      created_at: DataTypes.DATE,
    }, {
      sequelize: connection
    })
  }
}

module.exports = Ccp; 