const { Model, DataTypes } = require('sequelize');

class Aluno extends Model {
  static init(connection) {
    super.init({
      codigo: DataTypes.INTEGER,
      name: DataTypes.STRING,
      surname: DateTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cod_orientador: DataTypes.INTEGER,
      curso: DataTypes.STRING,
      created_at: DataTypes.DATE,
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.Orientador, { foreignKey: 'cod_orientador', as: 'orientador' })
}
}

module.exports = Aluno; 