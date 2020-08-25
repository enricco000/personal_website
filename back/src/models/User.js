const bcrypt = require('bcryptjs')

async function hashPassword (user) {
  const SALT_ROUNDS = 10
  if (!user.changed('password')) {
    return
  }
  try {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  } catch (err) {
    console.log(err)
  }
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
    isAdmin: DataTypes.BOOLEAN
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  return User
}
