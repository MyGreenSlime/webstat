const Imap = require("imap");

module.exports = {
  auth: (username, password) => {
    return new Promise(function(resolve, reject) {
      var imap = new Imap({
        user: username,
        password: password,
        host: "imap.ku.ac.th",
        port: 993,
        authTimeout: 1000,
        tls: true,
        tlsOptions: {
          rejectUnauthorized: false
        }
      });
      imap.once('ready', function() {
        let tempState = imap.state
        imap.end()
        if(tempState == 'authenticated'){
          return resolve({
            status : true,
            message : "authenicate with imap succeed"
          }) 
        }
      })

      imap.once('error', function(err) {
        let tempState = imap.state
        imap.end()
        if(tempState == 'connected'){
          return resolve({
            status : false,
            message : "authenicate with imap Failed : Please check your username and password"
          }) 
        } else {
          return reject("cannot connect with Imap server")
        }
      })
      imap.connect();
    });
  }
};
