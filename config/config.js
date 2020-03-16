module.exports = {
  db: {
    database: process.env.DATABASE || 'blog',
    username: 'root',
    password: '',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      define: {
        underscored: true,
        paranoid: true
      }
    }
  }
}
