const {
  sql,
  Sequelize
} = require('./sequelize')

const User = sql.define('user', {
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
})
module.exports = User
