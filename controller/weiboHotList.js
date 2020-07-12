const express = require('express');
const router = express.Router();
const weiboHotList = require('../service/weiboHotList')


router.get('/', (req, res, next) => {
  weiboHotList.fun_(req, res, next);
})


module.exports = router;