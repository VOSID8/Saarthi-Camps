const asyncHandler = require('express-async-handler')
const User = require('../models/user.models')
const jwt = require('jsonwebtoken')
// const { Queue } = require("bullmq");

const {
  sendTemporaryPassword,
  sendPasswordResetEmail,
} = require('../services/emailUtils')
const { generateAccessToken } = require('../security/accessTokenUtils')
const { generateRefreshToken } = require('../security/refreshTokenUtils')

// const emailQueue = new Queue("email-queue", {
//     connection: {
//         host: process.env.QUEUE_HOST,
//         port: process.env.QUEUE_PORT,
//         username: "default",
//         password: process.env.PASSWORD
//     }
// });

// const randomPasswordGen = () => {
//     const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     const password_length = 6;
//     let password = '';

//     for (var i = 0; i < password_length; i++) {
//         var rnum = Math.floor(Math.random() * chars.length);
//         password += chars.substring(rnum, rnum + 1);
//     }

//     return password;
// }
function isPasswordValid(password) {
  // Define constraints
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(password)

  // Check against constraints
  if (password.length < minLength) {
    return (
      'Password is too short (minimum length is ' + minLength + ' characters).'
    )
  }
  if (!hasUppercase) {
    return 'Password must contain at least one uppercase letter.'
  }
  if (!hasLowercase) {
    return 'Password must contain at least one lowercase letter.'
  }
  if (!hasDigit) {
    return 'Password must contain at least one digit.'
  }
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character.'
  }
  return ''
}

const createDeoCredentials = asyncHandler(async (req, res) => {
  // const password = randomPasswordGen();
  // req.body.password = password;
  //console.log(password);
  req.body.role = 'dataEntryOperator'
  let user = null

  //console.log(user);
  //send email to deo with temporary password
  if (isPasswordValid(req.body.password) === '') {
    user = await User.create(req.body)
    try {
      sendTemporaryPassword(req.body.name, req.body.email, req.body.password)
    } catch (e) {
      res.status(400)
      throw new Error('Duplicate Email Address!')
    }
  } else {
    res.status(400)
    throw new Error(isPasswordValid(req.body.password))
  }

  res.json(user)
})

const createDoctorCredentials = asyncHandler(async (req, res) => {
  // create random password of 6 characters
  // const password = randomPasswordGen()
  req.body.password = 'Ayush@1234'
  req.body.role = 'doctor'

  let user = null
  try {
    user = await User.create(req.body)
    // sendTemporaryPassword(req.body.name, req.body.email, req.body.password)
  } catch (e) {
    console.log(e)
    res.status(400)
    throw new Error('Duplicate email address')
  }
  console.log(user)
  res.json(user)
})

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error("User with specified email address doesn't exist")
  }

  if (user && (await user.isPasswordMatch(password))) {
    const accessToken = generateAccessToken(
      user._id,
      user.email,
      user.password,
      user.role
    )
    //const refreshToken = generateRefreshToken(user._id, user.email, user.password, user.role);

    //user.refreshTokens.push({ refreshToken });
    await user.save()

    // res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     domain: 'localhost:5173',
    //     secure: true,
    //     maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    // });
    res.json({ user, accessToken })
  } else {
    res.status(400)
    throw new Error('The password you provided is incorrect')
  }
})

const handleLogout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken')

  req.user.refreshTokens = req.user.refreshTokens.filter((token) => {
    return token.refreshToken !== req.refreshToken
  })
  await req.user.save()

  res.json(req.user)
})

const updatePassword = asyncHandler(async (req, res) => {
  req.user.password = req.body.password
  await req.user.save()
  res.json(req.user)
})

const handleUpdate = asyncHandler(async (req, res) => {
  const updateFields = Object.keys(req.body)
  updateFields.forEach((update) => {
    req.user[update] = req.body[update]
  })

  if (req.user.isModified('role')) {
    req.user.role = 'dataEntryOperator'
  }
  await req.user.save()

  res.json(req.user)
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { id, email } = req.user
  const payload = { id, email }
  const RESET_TOKEN_SECRET =
    process.env.RESET_PASSWORD_SECRET + req.user.password
  const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, { expiresIn: '10m' })

  sendPasswordResetEmail(email, id, resetToken)
  res.json()
})

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params
  const { newPassword } = req.body
  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(400)
      throw new Error("User doesn't exists")
    }

    const RESET_TOKEN_SECRET = process.env.RESET_PASSWORD_SECRET + user.password
    const payload = jwt.verify(token, RESET_TOKEN_SECRET)
    if (id !== payload.id) {
      res.status(400)
      throw new Error("This url doesn't exists")
    }

    user.password = newPassword
    await user.save()
    res.send('Password reset successfully')
  } catch (e) {
    throw new Error(e)
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = {
  createDeoCredentials,
  handleLogin,
  handleLogout,
  updatePassword,
  handleUpdate,
  forgotPassword,
  resetPassword,
  getUserProfile,
  createDoctorCredentials,
}
