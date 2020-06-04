// '/user'
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
/* GET users listing. */

router.get('/', (req, res, next) => {
  UserController.getAllUser(req, res, next)
})
router.get('/:id', (req, res, next) => {
  UserController.getUserById(req, res, next)
})
router.post('/register', (req, res, next) => {
  UserController.register(req, res, next)
})
module.exports = router
