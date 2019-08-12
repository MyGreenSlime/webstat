const LocalStrategy = require("passport-local").Strategy;
const CustomStrategy = require("passport-custom").Strategy;
const { Users, Admins,  } = require("../model/sequelize");

const Imap = require("../Imap/imap"); // for auth with kasetsart university (IMAP protocol)

module.exports = passport => {
  passport.use('user',
    new CustomStrategy((req, done) => {
      const username = req.body.username
      const password = req.body.password
      Users.findOne({
        where: {
          username: username
        },
        attributes: ['username', 'fullname', 'section']
      }).then(user => {
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
    var sessionUser = {username: user.username, fullname: user.fullname, section: user.section }
    done(null, sessionUser);
  });
  
  passport.deserializeUser(function(sessionUser, done) {
    Users.findOne({
      where : {
        username : sessionUser.username
      }
    })
    .then(user => {
      if(user) {
        done(null, user.get())
      } else {
        done(user.errors, null)
      }
    })
    
  });
  
};
