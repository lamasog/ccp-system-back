const { Model, DataTypes } = require('sequelize');

class Orientador extends Model {
  static init(connection) {
    super.init({
      codigo: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_ccp: DataTypes.TINYINT,
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