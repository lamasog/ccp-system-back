const fs = require('fs');
const path = require('path');

module.exports = {
  writeData: (data, filename) => {
    const dataString = JSON.stringify(data);

    fs.writeFile(path.resolve("relatorios", filename), dataString, function(error) {
      if(error) console.log(error);
      else console.log("File saved");
    });
  },

  appendAnswers: (newData, filename) => {
    fs.readFile(path.resolve("relatorios", filename), 'utf8', function (error, data) {
      if(error) console.log(error);
      else {
        let obj = JSON.parse(data);
        obj.respostas = newData;
        
        fs.writeFile(path.resolve("relatorios", filename), JSON.stringify(obj), function(error) {
          if(error) console.log(error);
          else console.log("Answers appended");
        });
      }
    });
  },

  appendFeedbackOrientador: (newData, filename) => {
    fs.readFile(path.resolve("relatorios", filename), 'utf8', function (error, data) {
      if(error) console.log(error);
      else {
        let obj = JSON.parse(data);
        obj.parecer_orientador = newData;
        
        fs.writeFile(path.resolve("relatorios", filename), JSON.stringify(obj), function(error) {
          if(error) console.log(error);
          else console.log("Answers appended");
        });
      }
    });
  },

  appendFeedbackCcp: (newData, filename) => {
    fs.readFile(path.resolve("relatorios", filename), 'utf8', function (error, data) {
      if(error) console.log(error);
      else {
        let obj = JSON.parse(data);
        obj.parecer_ccp = newData;
        
        fs.writeFile(path.resolve("relatorios", filename), JSON.stringify(obj), function(error) {
          if(error) console.log(error);
          else console.log("Answers appended");
        });
      }
    });
  }
}