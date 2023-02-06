const validator = require("xsd-schema-validator");

module.exports = {
  async Init(Context) {
    Context.Schema = {
      /*Faz a validação de um XML por Schema xsd */
      Valid(Xml, filePathXsd) {
       return new Promise((resolve, reject)  => {
    
          validator.validateXML(Xml, filePathXsd, function (err, result) {
            if (err) {
              return reject(result);
            }
            return resolve(result); //true
          });
        });
        
      },
    };
  },
};
