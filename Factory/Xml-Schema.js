/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2022-12-29 10:07:51
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:45:43
 * @ Description: email: alancastelan.ac@gmail.com
 */

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
