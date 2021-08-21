const Aluno = require('../models/Aluno');

const { hasNull } = require('../utils/hasNull');
const { generateHash, generateToken, validPassword } = require('../utils/auth');

module.exports = {

  async create(req, res) {
    if(hasNull(req.body, ['codigo', 'name', 'surname', 'email', 'password']))
      return res.status(400).send({ msg: "Missing required data"});

    const { codigo, name, surname, email, password } = req.body;

    try {
      const aluno = await Aluno.findAll({
        where: { codigo }
      });

      if(aluno.length > 0)
        return res.status(400).send({ msg: "Duplicate entries in the database" });

      const result = await Aluno.create({ codigo, name, surname, email, password: await generateHash(password) });
      result.password = undefined;

      return res.status(200).send({ aluno: result, token: generateToken({ id: result.id, ccp: result.is_ccp }) });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async read(req, res) {
    if(!req.ccp)
      return res.status(403).send({ mgs: 'Forbidden' });

    try {
      const alunos = await Aluno.findAll({
        attributes: { exclude: ['password'] }
      });

      if(alunos.length === 0)
        return res.status(404).send({ msg: 'Not found'});

      return res.status(200).send(alunos);

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async update(req, res) {

    try {
      const aluno = await Aluno.findOne({ 
        where: req.id
      });

      if(!aluno)
        return res.status(404).send({ msg: "Not found" });

      const { name, surname, email, oldPassword, password } = req.body;

      if(password) {
        if(!oldPassword)
          return res.status(400).send({ msg: "Missing required data" });

        if(!(await validPassword(oldPassword, aluno.password)))
          return res.status(400).send({ msg: "Invalid password" });

        await aluno.update({ name, surname, email, password: await generateHash(password) });
      }
      else await aluno.update({ name, surname, email });

      aluno.password = undefined;
      return res.status(200).send({ msg: "Successfully updated"});

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async delete(req, res) {
    if(!req.ccp)
      return res.status(403).send({ msg: "Forbidden" });

    try {
      const aluno = await Aluno.findOne({
        where: req.id
      });

      if(!aluno)
        return res.status(404).send({ msg: "Not found" });

      await aluno.destroy();
      return res.status(200).send({ msg: "Successfully deleted" });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async login(req, res) {
    if(hasNull(req.body, ['codigo', 'password']))
      return res.status(400).send({ msg: "Missing required data" });

    const { codigo, password } = req.body;

    try {
      const aluno = await Aluno.findOne({ 
        where: { codigo } 
      });

      if(!aluno)
        return res.status(404).send({ msg: "Not found" });

      if(!(await validPassword(password, aluno.password)))
        return res.status(400).send({ msg: "Invalid password" });

      aluno.password = undefined;
      return res.status(200).send({ aluno, token: generateToken({ codigo: aluno.codigo, ccp: aluno.is_ccp }) });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}