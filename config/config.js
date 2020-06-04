
const crypto = require('crypto')

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
  },
  security: {
    MD5_SUFFIX: 'no#thing$一个固定长度的盐值',
    md5: (pwd) => {
      const md5 = crypto.createHash('md5')
      return md5.update(pwd).digest('hex')
    },
    secretKey: 'no#thing$'
    // // 过期时间 1小时
    // expiresIn: 60 * 60
  }
}
