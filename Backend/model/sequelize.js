const Sequelize = require('sequelize');
const userdb  = require('./user')
const admindb = require('./admin')

const database = {
  username: "dondon",
  password: "dondon",
  dbname : "dondon"
}
const sequelize = new Sequelize(database.dbname, database.username, database.password, {
  host: '192.168.99.100',
  port: '5432',
  dialect: 'postgres'
});
sequelize
.authenticate().then(() => {
  console.log("Login Database Pass")
})
.catch(err => {
  console.error('Unable to connect to the database:', err)
})

const Users = userdb(sequelize, Sequelize)
const Admins = admindb(sequelize, Sequelize)

sequelize.sync({force: false})
  .then(() => {
    console.log(`Connect Database`)
  })

module.exports = {
    Users,
    Admins,
    sequelize
}