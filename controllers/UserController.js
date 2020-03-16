/* eslint-disable camelcase */
const {
  User
} = require('../model/Model')
const {
  response
} = require('./Response')
// get请求: req.body  post请求: req.params
async function register (req, res) {
  const postData = req.body
  const email = postData.email
  const password = postData.password
  const time = new Date()
  const created_at = time
  const updated_at = time
  try {
    const user = await User.create({
      password,
      email,
      created_at,
      updated_at
    })
    res.status(201).send({
      user
    })
  } catch (error) {
    res.status(400).send({
      code: 400,
      error: '该用户已被注册'
    })
    console.log(error)
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
  } catch (error) {
    console.log(error.message)
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
  } catch (error) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}
module.exports = {
  register,
  getUserById,
  getAllUser
}
