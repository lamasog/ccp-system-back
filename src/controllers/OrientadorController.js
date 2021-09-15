const Orientador = require('../models/Orientador');

const { hasNull } = require('../utils/hasNull');
const { generateHash, generateToken, validPassword } = require('../utils/auth');

module.exports = {

  async create(req, res) {
    if(hasNull(req.body, ['codigo', 'name', 'surname', 'email', 'password']))
      return res.status(400).send({ msg: "Missing required data"});

    const { codigo, name, surname, email, password } = req.body;

    try {
      const orientador = await Orientador.findAll({
        where: { codigo }
      });

      if(orientador.length > 0)
        return res.status(400).send({ msg: "Duplicate entries in the database" });

      const result = await Orientador.create({ codigo, name, surname, email, password: await generateHash(password) });
      result.password = undefined;

      return res.status(200).send({ orientador: result, token: generateToken({ id: result.id, ccp: result.is_ccp }) });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async read(req, res) {
    if(!req.ccp)
      return res.status(403).send({ mgs: 'Forbidden' });

    try {
      const orientadores = await Orientador.findAll({
        attributes: { exclude: ['password'] }
      });

      if(orientadores.length === 0)
        return res.status(404).send({ msg: 'Not found'});

      return res.status(200).send(orientadores);

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const orientador = await Orientador.findOne({ 
        where: req.id
      });

      if(!orientador)
        return res.status(404).send({ msg: "Not found" });

      const { name, surname, email, oldPassword, password } = req.body;

      if(password) {
        if(!oldPassword)
          return res.status(400).send({ msg: "Missing required data" });

        if(!(await validPassword(oldPassword, orientador.password)))
          return res.status(400).send({ msg: "Invalid password" });

        await orientador.update({ name, surname, email, password: await generateHash(password) });
      }
      else await orientador.update({ name, surname, email });

      orientador.password = undefined;
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
      const orientador = await Orientador.findOne({
        where: req.id
      });

      if(!orientador)
        return res.status(404).send({ msg: "Not found" });

      await orientador.destroy();
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
      const orientador = await Orientador.findOne({ 
        where: { codigo } 
      });

      if(!orientador)
        return res.status(404).send({ msg: "Not found" });

      if(!(await validPassword(password, orientador.password)))
        return res.status(400).send({ msg: "Invalid password" });

      orientador.password = undefined;
      return res.status(200).send({ orientador, token: generateToken({ id: orientador.id, ccp: orientador.is_ccp }) });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}