const Relatorio = require('../models/Relatorio');
const Aluno = require('../models/Aluno');

const fs = require('fs');
const { hasNull } = require('../utils/hasNull');

module.exports = {

  async create(req, res) {
    if(!req.ccp)
      return res.status(403).send({ mgs: 'Forbidden' });
    
    if(hasNull(req.body, ['cod_aluno']))
      return res.status(400).send({ msg: "Missing required data"});

    const { cod_aluno } = req.body;
    
    try {
      const aluno = await Aluno.findAll({
        where: { codigo: cod_aluno }
      });

      if(aluno.length === 0)
        return res.status(404).send({ msg: "Not found" });

      const filename = `${cod_aluno}.json`;

      const result = await Relatorio.create({ cod_aluno, filename });
      return res.status(200).send({ result });
      
    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  // async create(req, res) {
  //   try {
  //     const aluno = await Aluno.findOne({ 
  //       where: req.id
  //     });

  //     if(!aluno)
  //       return res.status(404).send({ msg: "Aluno not found" });
    
  //     if(hasNull(req.body, ['resp1', 'resp2', 'resp3', 'resp4', 'resp5', 
  //     'resp6', 'resp7', 'resp8', 'resp9', 'resp10', 
  //     'resp11', 'resp12', 'resp13', 'resp14', 'resp15', 
  //     'resp16', 'resp17', 'resp18', 'resp19', 'resp20'])) {

  //       return res.status(400).send({ msg: "Missing required data"});
  //     }
    
  //     const jsonString = JSON.stringify(req.body);
      
  //     fs.writeFile('../../relatorios/relatorio1.json', jsonString, function(error) {
  //       if(error) {
  //           console.log(error);
  //       } else {
  //           console.log("The file was saved!");
  //       }
  //   }); 

  //   } catch(error) {
  //     console.log(error);
  //     return res.status(500).send({ msg: "Internal server error" });
  //   }
  // }
}