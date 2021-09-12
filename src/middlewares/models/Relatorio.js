const { Model, DataTypes } = require('sequelize');

class Relatorio extends Model {
  static init(connection) {
    super.init({
      cod_aluno: DataTypes.STRING,
      filename: DataTypes.STRING,
      created_at: DataTypes.DATE,
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'cod_aluno', as: 'aluno' });
  }
}

module.exports = Relatorio; 