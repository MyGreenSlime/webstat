const LocalStrategy = require("passport-local").Strategy;
const CustomStrategy = require("passport-custom").Strategy;
const Users  = require("../model/user");

const Imap = require("../middleware/imap"); // for auth with kasetsart university (IMAP protocol)

module.exports = passport => {
  passport.use('user',
    new CustomStrategy((req, done) => {
      if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
      }
      const base64Credentials =  req.headers.authorization.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');
      Users.findOne({
        username: username
      }, 'username fullname section admin').then(user => {
        if (user === null) {
          return done(null, false, { issue: "Incorrect username." });
        } else {
          Imap.auth(username, password)
            .then(result => {
              if (result.status == true) {
                return done(null, user);
              } else {
                return done(null, false, { issue: "Incorrect password." });
              }
            })
            .catch(err => {
              return done(err);
            });
        }
      });
    })
  );
  passport.serializeUser(function(user, done) {
    var sessionUser = {username: user.username, fullname: user.fullname, section: user.section, admin : user.admin }
    done(null, sessionUser);
  });
  
  passport.deserializeUser(function(sessionUser, done) {
    done(null, sessionUser)
    
  });
  
};
