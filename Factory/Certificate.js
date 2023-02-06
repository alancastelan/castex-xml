const forge = require("node-forge");
const fs = require("fs");

module.exports = {
  async Init(Context) {
    Context.Certificate = {
      /* Faz a Leitura do arquivo PFX  */
      Load: async (Path, Pass) => {
        try {
          /*
          if (!fs.existsSync(Path)) {
            await Context.Log.err(
              "O Arquivo do Certificado não foi encontrado, verifique se o caminho esta correto!"
            );
            return false;
          }*/

          var pfx = fs.readFileSync(Path);
          const p12buffer = pfx.toString("base64");

          const asn = forge.asn1.fromDer(forge.util.decode64(p12buffer));
          const p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, Pass);

          const keyData = p12
            .getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })
            [forge.pki.oids.pkcs8ShroudedKeyBag].concat(
              p12.getBags({ bagType: forge.pki.oids.keyBag })[
                forge.pki.oids.keyBag
              ]
            );

          const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[
            forge.pki.oids.certBag
          ];

          const rsaPrivateKey = forge.pki.privateKeyToAsn1(keyData[0].key);
          const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
          const cert = forge.pki.certificateToPem(certBags[0].cert);
          const key = forge.pki.privateKeyInfoToPem(privateKeyInfo);

          return {
            pem:cert,
            key:key,
          };
        } catch (err) {
          return err;
        }
      },




    };




  },
};
