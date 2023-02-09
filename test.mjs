/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2022-12-29 11:50:24
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:17:58
 * @ Description:
 */

import CastexXml from "../index.js";

/* Exemplo de chamada do Certificado */
var Certificado = {
  path: "./test/cert.pfx",
  pass: "sua senha",
};

/* Exemplo de Leitura do Certificado*/

var res = CastexXml.Certificate.Load(Certificado.path,Certificado.pass);
console.log(res);

