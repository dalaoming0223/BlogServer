const express = require('express')
const router = express.Router()
const TagController = require('../controllers/TagController')

router.post('/', (req, res, next) => {
  TagController.add_tag(req, res, next)
})

router.put('/:id', (req, res, next) => {
  TagController.update_tag(req, res, next)
})

router.delete('/:id', (req, res, next) => {
  TagController.delete(req, res, next)
})

router.get('/', (req, res, next) => {
  TagController.get_all_tag(req, res, next)
})

router.get('/:id', (req, res, next) => {
  TagController.get_tag_by_id(req, res, next)
})

router.get('/:id/blogs', (req, res, next) => {
  TagController.get_blogs_by_tag_id(req, res, next)
})

module.exports = router
