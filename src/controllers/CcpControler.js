const Ccp = require('../models/Ccp');

const { hasNull } = require('../utils/hasNull');
const { generateToken, validPassword } = require('../utils/auth');

module.exports = {

  async login(req, res) {
    if(hasNull(req.body, ['codigo', 'password']))
      return res.status(400).send({ msg: "Missing required data" });

    const { codigo, password } = req.body;

    try {
      const ccp = await Ccp.findOne({ 
        where: { codigo } 
      });

      if(!ccp)
        return res.status(404).send({ msg: "Not found" });

      if(!(await validPassword(password, ccp.password)))
        return res.status(400).send({ msg: "Invalid password" });

      ccp.password = undefined;
      return res.status(200).send({ ccp, token: generateToken({ id: ccp.id, ccp: ccp.is_ccp }) });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}