/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2022-12-29 10:07:51
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:45:48
 * @ Description: email: alancastelan.ac@gmail.com
 */

const https = require('https')
const fetch = require('node-fetch')

module.exports = {
  async Init(Context) {
    Context.Soap = {
      /*Cria o envelope para envio do Xml por Soap */
      CreateSoapEnvelope(xml, soapBody) {
        var soapEnvelopeObj = {
          $: {
            'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
          },
          'soap:Body': soapBody,
        }
        var soapEnvXml = Context.Utils.JsToXml(
          soapEnvelopeObj,
          'soap:Envelope',
        )
        return soapEnvXml.replace('[XML]', xml)
      },

      /* Faz a requisição 
      data =>
        xml,
        cert,[optional]
        soap,
      
      */
      async Request(data) {
        /* Objeto de Retorno */
        let result = { send: data.xml }

        try {
          //Opções da requisição
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': data.soap.contentType,
              SOAPAction: data.soap.action,
            },
            body: Context.Soap.CreateSoapEnvelope(
              data.xml,
              data.soap.body,
            ),
          }
          if (data.cert) {
            options.agent = new https.Agent({
              rejectUnauthorized: false,
              // pfx: cert.pfx,
              cert: data.cert.pem,
              key: data.cert.key,
              passphrase: data.cert.password,
            })
          }

          //Faz a requisição
          const res = await fetch.default(data.soap.url, options)
          /* Registra os dados do resultado da consulta */
          result.status = res.status
          result.received = await res.text()

          /* Valida o resultado */
          if (result.status == 200) {
            result.success = true

            /* Converte o resultado de xml para objeto JS */
            var ObjRes = Context.Utils.XmlToJs(result.received, {
              explicitArray: false,
            })

            /* Verifica se foi convertido com sucesso, se sim registra em result.data */
            if (ObjRes) {
              result.data = ObjRes
            }
          }
          return result
        } catch (err) {
          result.success = false
          result.error = err
          return result
        }
      },
    }
  },
}
