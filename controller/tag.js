const express = require('express');
const router = express.Router();
const tag = require('../service/tag');
const blog = require('../service/blog')

router.post('/', (req, res, next) => {
    tag.add_tag(req, res, next);
});

router.put('/:id', (req, res, next) => {
    tag.update_tag(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    tag.delete_tag(req, res, next);
});


router.get('/', (req, res, next) => {
    tag.get_all_tag(req, res, next);
});

router.get('/:id', (req, res, next) => {
    tag.get_tag_by_id(req, res, next);
});

router.get('/:id/blogs', (req, res, next) => {
    blog.get_blogs_by_tag_id(req, res, next);
});

//设置跨域访问
// router.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

module.exports = router;
