const express = require('express')
const router = express.Router()
const BlogController = require('../controllers/BlogController')

router.get('/', (req, res, next) => {
  BlogController.getAllBlog(req, res, next)
})

router.get('/:id', (req, res, next) => {
  BlogController.getBlogById(req, res, next)
})

router.post('/', (req, res, next) => {
  BlogController.AddBlog(req, res, next)
})
// router.get('/:id/comments', (req, res, next) => {
//   comment_dao.get_comments_by_blog_id(req, res, next)
// })

// 设置跨域访问
// router.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   res.header('X-Powered-By', ' 3.2.1')
//   res.header('Content-Type', 'application/json;charset=utf-8')
//   next()
// })
module.exports = router
