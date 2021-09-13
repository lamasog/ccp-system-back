const fs = require('fs');
const path = require('path');

module.exports = {
  writeFile: (data, filename) => {
    const dataString = JSON.stringify(data);

    fs.writeFile(path.resolve("relatorios", filename), dataString, function(error) {
      if(error) console.log(error);
      else console.log("File saved");
    });
  },

  // appendFile: (newData, filename) => {
  //   fs.readFile(path.resolve("relatorios", filename), 'utf8', function (error, data) {
  //     if(error) console.log(error);
  //     else {
  //       let obj = JSON.parse(data);
  //       obj.push(newData);
  //       writeFile(obj, filename);
  //     }
  //   });
  // }
} 