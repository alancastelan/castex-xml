/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2022-12-29 09:52:55
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:23:50
 * @ Description:
 */

var Factory = {
     /* 
        Lista dos módulos que Moldam o Contexto será iniciado sequencialmente,
        
        */
        List: [ 
            /* Estrutura de logs */
            "Log",  
            /* Cria a estrutura Certificate */
            "Certificate",
            /* Cria a estrutura Sign */
            "Xml-Sign",
            /* Utils */
            "Xml-Utils",
            /* Soap */
            "Xml-Soap",
            /* Schema */
            "Xml-Schema",
          ],

          Init(Context) {

            for (var i = 0; i < this.List.length; i++) {
              var ModuleFactory = require(__dirname + "/Factory/" + this.List[i]);
              ModuleFactory.Init(Context);
            }
            return Context;          
}}

module.exports = Factory.Init({});