/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2022-12-29 11:50:24
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:55:00
 * @ Description: email: alancastelan.ac@gmail.com
 * discord - https://discord.gg/vXXhu5h6
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

