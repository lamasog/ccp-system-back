const Relatorio = require('../models/Relatorio');
const Aluno = require('../models/Aluno');
const Orientador = require('../models/Orientador');

const { hasNull } = require('../utils/hasNull');
const { writeData, appendAnswers, appendFeedbackCcp, appendFeedbackOrientador } = require('../utils/file');
const path = require('path');

module.exports = {
  async create(req, res) {
    if(!req.ccp)
      return res.status(403).send({ mgs: 'Forbidden' });
    
    if(hasNull(req.body, ['cod_aluno']))
      return res.status(400).send({ msg: "Missing required data"});

    const { cod_aluno } = req.body;
    
    try {
      const aluno = await Aluno.findOne({
        where: { codigo: cod_aluno }
      });

      if(!aluno)
        return res.status(404).send({ msg: "Not found" });

      const data = {
        codigo: aluno.codigo,
        name: aluno.name,
        surname: aluno.surname,
        email: aluno.email,
        curso: aluno.curso
      };

      const filename = `${cod_aluno}.json`;
      writeData(data, filename);

      const result = await Relatorio.create({ cod_aluno, filename });
      return res.status(200).send({ result });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async listAluno(req, res) {
    try {
      const aluno = await Aluno.findOne({ 
        where: req.id
      });
      
      const relatorios = await Relatorio.findAll({ 
        where: { 
          cod_aluno: aluno.codigo
        } 
      });

      if(relatorios === 0)
        return res.status(404).send({ msg: "Not found" });
      
      return res.status(200).sendFile(relatorios);

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async readAluno(req, res) {
    try {
      const aluno = await Aluno.findOne({ 
        where: req.id
      });
      
      const relatorio = await Relatorio.findOne({ 
        where: { 
          cod_aluno: aluno.codigo
        } 
      });

      if(!relatorio)
        return res.status(404).send({ msg: "Not found" });
      
      const filename = `${relatorio.filename}`;
      return res.status(200).sendFile(path.resolve("relatorios", filename));

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async readOrientador(req, res) {
    const orientador = await Orientador.findOne({ 
      where: req.id
    });

    const { cod_aluno } = req.body;

    try {    
      const aluno = await Aluno.findOne({ 
        where: { 
          codigo: cod_aluno
        }
      });

      if(!aluno)
        return res.status(404).send({ msg: "Not found" });
        
      if(aluno.cod_orientador !== orientador.codigo)
        return res.status(403).send({ msg: "Forbidden" });
      else {
        const relatorio = await Relatorio.findOne({ 
          where: { cod_aluno }
        });

        if(!relatorio)
          return res.status(404).send({ msg: "Not found" });
            
        const filename = `${relatorio.filename}`;
        return res.status(200).sendFile(path.resolve("relatorios", filename));
        };
      } 
      catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async readCcp(req, res) {
    if(!req.ccp)
      return res.status(403).send({ mgs: 'Forbidden' });

    const { cod_aluno } = req.body;

    try {      
      const relatorio = await Relatorio.findOne({ 
        where: { 
          cod_aluno
        } 
      });

      if(!relatorio)
        return res.status(404).send({ msg: "Not found" });
      
      const filename = `${relatorio.filename}`;
      return res.status(200).sendFile(path.resolve("relatorios", filename));

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async listCcp(req, res) {
    if(!req.ccp)
      return res.status(403).send({ mgs: 'Forbidden' });

    try {
      const relatorios = await Relatorio.findAll();
      if(relatorios.length === 0)
        return res.status(404).send({ msg: "Not found" });

      return res.status(200).send(relatorios);
    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  },

  async answerAluno(req, res) {
    if(hasNull(req.body, 
      [
        'resp1', 'resp2', 'resp3', 'resp4', 'resp5', 
        'resp6', 'resp7', 'resp8', 'resp9', 'resp10', 
        'resp11', 'resp12', 'resp13', 'resp14', 'resp15', 
        'resp16', 'resp17', 'resp18', 'resp19', 'resp20'
      ]
    ))
      return res.status(400).send({ msg: "Missing required data"});
      
    const answers = req.body;

    try {
      const aluno = await Aluno.findOne({ 
        where: req.id
      });
      
      const relatorio = await Relatorio.findOne({ 
        where: { 
          cod_aluno: aluno.codigo
        } 
      });

      if(!relatorio)
        return res.status(404).send({ msg: "Not found" });
      
      filename = `${relatorio.filename}`;      
      appendAnswers(answers, filename);
      
      return res.status(200).sendFile(path.resolve("relatorios", filename));

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }   
  },

  async feedbackOrientador(req, res) {
    if(hasNull(req.body, ['cod_aluno', 'feedback']))
    return res.status(400).send({ msg: "Missing required data"});
    
    const { cod_aluno, feedback } = req.body;
    
    try {
      const orientador = await Orientador.findOne({ 
        where: req.id
      });
  
      if(!orientador)
        return res.status(403).send({ msg: "Forbidden" });

      const relatorio = await Relatorio.findOne({ 
        where: { 
          cod_aluno
        }
      });
      
      if(!relatorio)
      return res.status(404).send({ msg: "Not found" });
      
      const filename = `${relatorio.filename}`;      
      appendFeedbackOrientador(feedback, filename);
      
      return res.status(200).sendFile(path.resolve("relatorios", filename));

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }   
  },

  async feedbackCcp(req, res) {
    if(hasNull(req.body, ['cod_aluno', 'feedback']))
      return res.status(400).send({ msg: "Missing required data"});
    
    const { cod_aluno, feedback } = req.body;
    
    try {
      if(!req.ccp)
        return res.status(403).send({ msg: "Forbidden" });

      const relatorio = await Relatorio.findOne({ 
        where: { 
          cod_aluno
        }
      });
      
      if(!relatorio)
      return res.status(404).send({ msg: "Not found" });
      
      const filename = `${relatorio.filename}`;      
      appendFeedbackCcp(feedback, filename);
      
      return res.status(200).sendFile(path.resolve("relatorios", filename));

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }   
  },

  async delete(req, res) {
    if(!req.ccp)
      return res.status(403).send({ msg: "Forbidden" });
    
    if(hasNull(req.body, ['cod_aluno']))
      return res.status(400).send({ msg: "Missing required data"});
    
    const { cod_aluno } = req.body;

    try {
      const relatorio = await Relatorio.findOne({
        where: { cod_aluno }
      });

      if(!relatorio)
        return res.status(404).send({ msg: "Not found" });
      
      await relatorio.destroy();
      return res.status(200).send({ msg: "Successfully deleted" });

    } catch(error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}