const { Model, DataTypes } = require('sequelize');

class Aluno extends Model {
  static init(connection) {
    super.init({
      codigo: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cod_orientador: DataTypes.STRING,
      curso: DataTypes.STRING,
      is_ccp: DataTypes.TINYINT,
      created_at: DataTypes.DATE,
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.Orientador, { foreignKey: 'cod_orientador', as: 'orientador' });
  }
}

module.exports = Aluno; 