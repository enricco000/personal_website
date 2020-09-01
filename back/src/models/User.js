const bcrypt = require('bcryptjs')

async function hashPassword (user) {
  const SALT_ROUNDS = 10
  if (!user.changed('password')) {
    return
  }
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    verified: DataTypes.BOOLEAN
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })
  return User
}
