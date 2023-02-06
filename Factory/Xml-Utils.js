const forge = require("node-forge");
const xml2js = require("xml2js");
const fs = require("fs");

module.exports = {
  async Init(Context) {
    Context.Utils = {
      
      /*Converte um Objeto JS para XML acesse https://www.npmjs.com/package/xml2js para ver a documentação */
      JsToXml(obj, rootTag) {
        let builder = new xml2js.Builder({
          rootName: rootTag,
          headless: true,
          renderOpts: {
            pretty: false,
          },
          cdata: true,
        });
        return builder.buildObject(obj);
      },
      /*Converte um XML para Objeto JS acesse https://www.npmjs.com/package/xml2js para ver a documentação */
      XmlToJs(xml, options) {
        let resultObj;
        if (!options) {
          options = {
            mergeAttrs: true,
            ignoreAttrs: true,
            explicitArray: false,
          };
        }
        let parser = new xml2js.Parser(options);
        parser.parseString(xml, function (err, result) {
          if (err) {
            throw new Error("Erro ao deserializar XML" + err);
          }
          resultObj = result;
        });
        return resultObj;
      },

    /*Converte um XML para Objeto JS acesse https://www.npmjs.com/package/xml2js para ver a documentação */
      proxyToUrl(pr) {
        const server = `${pr.host}:${pr.port}`;
        let auth = null;
        let final = pr.isHttps ? "https://" : "http://";
        if (pr.auth) {
          final = `${final}${pr.auth.username}:${pr.auth.password}@`;
        }
        return `${final}${server}`;
      },
      
      /* Remove objetos nulos */
      removeSelfClosedFields(o) {
        Object.keys(o).forEach(key => {
            if (o[key] !== null && typeof o[key] === 'object') {
                Context.Xml.Utils.removeSelfClosedFields(o[key]);
                return;
            }
            if (o[key] === undefined || o[key] === '' || o[key] === null) {
                delete o[key];
            }
        });
    }


    };




  },
};
