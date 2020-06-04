/* eslint-disable camelcase */
const {
  User
} = require('../model/Model')
const {
  response
} = require('./Response')
const jwt = require('jsonwebtoken')
const { security } = require('../config/config')
// get请求: req.body  post请求: req.params

async function register (req, res) {
  const ret_data = {}
  const { username, password, email } = req.body
  console.log(req.body)
  const time = new Date()
  const created_at = time
  const updated_at = time
  const is_admin = 0
  const is_active = 1

  try {
    const encryptPass = security.md5(password)
    const token = null
    const user = await User.create({
      username, password: encryptPass, email, token, created_at, updated_at, is_admin, is_active
    })
    ret_data.id = user.id
    response(res, ret_data, 201)
    console.log('ok')
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}

async function getUserById (req, res) {
  const id = req.params.id
  const ret_data = {}
  try {
    // findByPk 通过主键进行查询
    const user = await User.findByPk(id)
    if (user === null) {
      response(res, ret_data, 404)
    } else {
      console.log(JSON.stringify(user))
      ret_data.data = user
      response(res, ret_data, 200, 0)
    }
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}

async function getAllUser (req, res) {
  const ret_data = {}
  try {
    const user = await User.findAll()
    ret_data.data = user
    ret_data.total = user.length
    ret_data.page = 1
    response(res, ret_data, 200, 0)
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}
module.exports = {
  register,
  getUserById,
  getAllUser
}
