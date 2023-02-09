/**
 * @ Author: Alan Castelan - Castech
 * @ Create Time: 2023-02-09 08:16:47
 * @ Modified by: Alan Castelan
 * @ Modified time: 2023-02-09 08:45:40
 * @ Description: email: alancastelan.ac@gmail.com
 */

module.exports = {

    Init(Context){
  
      Context.Log = {
        Error:[],
        Warning:[],
        Info: [],
        err: function (message, data = "") {
          if (data != "") {
            this.Error.push({ msg: message, obj: data });
          } else {
            this.Error.push({ msg: message });
          }
          console.log("[ERROR] " + message);
          process.exit(1);
        },
        warn: function (message, data = "") {
          if (data != "") {
            this.Warning.push({ msg: message, obj: data });
          } else {
            this.Warning.push({ msg: message });
          }
          console.log("[WARNING] " + message);
        },
        inf: function (message, data = "") {
          if (data != "") {
            this.Info.push({ msg: message, obj: data });
          } else {
            this.Info.push({ msg: message });
          }
          console.log("[INFO] " + message);
        },
      
        clear: function () {
          this.Error = [];
          this.Warning = [];
          this.Info = [];
        },
        save: function () {},
      };
    }
  }