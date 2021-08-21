const { Model, DataTypes } = require('sequelize');

class Aluno extends Model {
  static init(connection) {
    super.init({
      codigo: DataTypes.INTEGER,
      name: DataTypes.STRING,
      surname: DateTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.hasMany(models.Aluno, { foreignKey: 'cod_orientador', as: 'alunos' })
}
}

module.exports = Orientador; 