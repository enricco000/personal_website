const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const { email, username } = req.body
      const existingEmail = await User.findOne({
        where: {
          email: email
        }
      })
      const existingUsername = await User.findOne({
        where: {
          username: username
        }
      })
      if (existingEmail != null) {
        res.status(400).send({
          error: 'This email account already has a username associated'
        })
      }
      if (existingUsername != null) {
        res.status(400).send({
          error: 'This username is taken'
        })
      }
      if (existingEmail == null && existingUsername == null) {
        req.body.isAdmin = false
        req.body.verified = false
        const date = new Date()
        const signData = {
          username: username,
          created: date.toString()
        }
        const tokenMailVerification = jwt.sign(signData, config.authentication.jwtSecret, { expiresIn: '1d' })
        const url = config.verificationEmail.baseURL + 'verify?verificationToken=' + tokenMailVerification
        const transporter = nodemailer.createTransport({
          name: config.verificationEmail.domain,
          host: config.verificationEmail.domain,
          port: 465,
          secure: true, // use SSL
          auth: {
            user: config.verificationEmail.user, // username for your mail server
            pass: config.verificationEmail.password // password
          }
        })
        // send mail with defined transport object
        await transporter.sendMail({
          from: `${config.verificationEmail.name} <${config.verificationEmail.user}>`, // sender address
          to: email, // list of receivers seperated by comma
          subject: 'Account Verification', // Subject line
          text: 'Click on the link below to verify your account ' + url // plain text body
        })
        const user = await User.create(req.body)
        res.send(user.toJSON())
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occured during registration'
      })
    }
  },
  async verify (req, res) {
    try {
      const { verificationToken } = req.body
      const decoded = jwt.verify(verificationToken, config.authentication.jwtSecret)
      await User.update({ verified: true },
        {
          where: {
            username: decoded.username
          }
        }
      )
      const verifiedUser = await User.findOne({
        where: {
          username: decoded.username
        }
      })
      res.send(verifiedUser.toJSON())
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Bad verification'
      })
    }
  },
  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect'
        })
      }
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw err
        } else if (response === true) {
          const userJSON = user.toJSON()
          return res.send({
            user: userJSON,
            token: jwtSignUser(userJSON)
          })
        } else {
          return res.status(403).send({
            error: 'The login information is incorrect'
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  }
}
