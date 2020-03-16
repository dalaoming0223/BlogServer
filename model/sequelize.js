const Sequelize = require('sequelize')
const config = require('../config/config')

const sql = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)
module.exports = {
  sql,
  Sequelize
}
