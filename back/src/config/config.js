const path = require('path')

module.exports = {
  port: process.env.DB_NAME || 3000,
  db: {
    databse: process.env.DB_NAME || 'personal_site_db',
    user: process.env.DB_USER || 'personal_site_db',
    password: process.env.DB_PASS || 'personal_site_db',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../personal_site_db.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'X4N5yxttjya3wEfX'
  }
}
