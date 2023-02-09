/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2022-12-29 10:07:51
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:45:45
 * @ Description: email: alancastelan.ac@gmail.com
 */

let SignedXml = require('xml-crypto').SignedXml;

module.exports = {
  async Init(Context) {
    Context.Sign = {
      
      /* Faz a Assinatura do Xml  */
      Signed: async (Certificate, Tag, Xml) => {

        try {
          /* Obtemos o certificado e chave*/
          const _cert = await Context.Certificate.Load(Certificate.path, Certificate.pass);

          let sig = new SignedXml();
          sig.addReference(
            "//*[local-name(.)='" + Tag + "']",
            "",
            "",
            "",
            "",
            "",
            true
          );
          sig.signingKey = _cert.key;
          sig.computeSignature(Xml);
          return [sig.getSignedXml(),_cert];
        } catch (err) {
          err;
        }
      },

      /* Faz a Assinatura X509  */
      X509: async (Certificate,Tag,Xml) => {
        try {
          /* Obtemos o certificado e chave*/
          const _cert = await Context.Certificate.Load(Certificate.path, Certificate.pass);

          const transforms = [
            "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
            "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
          ];
          const infoProvider = (_pem) => {
            return {
              getKeyInfo() {
                const cert = this.getCert();
                return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
              },
              getCert() {
                const certLines = _pem.toString().split("\n");
                return certLines
                  .filter((e, i) => i && e && e.indexOf("-----") !== 0)
                  .join("");
              },
            };
          };
          let sig = new SignedXml();
          sig.addReference(
            "//*[local-name(.)='" + Tag + "']",
            transforms,
            "",
            "",
            "",
            "",
            false
          );
          sig.signingKey = _cert.key;
          sig.canonicalizationAlgorithm =
            "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
          sig.keyInfoProvider = infoProvider(_cert.pem);
          sig.computeSignature(Xml);
          return [sig.getSignedXml(),_cert];

        } catch (err) {
          return err;
        }
      },
    };
  },
};
