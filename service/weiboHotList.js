/**
 * superagent 是一个轻量级、渐进式的请求库，内部依赖 nodejs 原生的请求 api,适用于 nodejs 环境。
 * herrio 是 nodejs 的抓取页面模块，为服务器特别定制的，快速、灵活、实施的 jQuery 核心实现。适合各种 Web 爬虫程序。node.js 版的 jQuery。
 * 
 */

const cheerio = require("cheerio")
const superagent = require("superagent")
const fs = require("fs")
const nodeSchedule = require("node-schedule")
const weiboURL = "https://s.weibo.com"
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot"
const {response} = require('./response')

/**
 * 获取热搜列表数据方法
 */
function getWeiBoHotList() {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) reject("request error");
      const $ = cheerio.load(res.text);
      let hotList = [];
      $("#pl_top_realtimehot table tbody tr").each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1);
          const link = weiboURL + $td.find("a").attr("href");
          const text = $td.find("a").text();
          const hotValue = $td.find("span").text();
          const icon = $td.find("img").attr("src")
            ? "https:" + $td.find("img").attr("src")
            : "";
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          });
        }
      });
      hotList.length ? resolve(hotList) : reject("errer");
    });
  });
}

/*
 * schedule

*    *    *    *    *    *    
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

 */
/**
 * 每分钟第30秒定时执行爬取任务
 */

async function fun_(req, res, next) {
//   nodeSchedule.scheduleJob("10 * * * * *", async function () {
//   try {
//     const hotList = await getWeiBoHotList();

//     await fs.writeFileSync(//,
//       `${__dirname}/hotSearch.json`,
//       JSON.stringify(hotList),
//       "utf-8"
//     );
//     console.log("写入成功", Date.now());
//     const file = `${__dirname}/hotSearch.json`
//     const result = JSON.parse(fs.readFileSync(file))
//     console.log('测试')
//     response(res, result, 200, 0)
//   } catch (error) {
//     const file = `${__dirname}/hotSearch.json`
//     const result = '失败'
//     console.error(error);
//     response(res, result, 400)
//   }
// })
try {
  const hotList = await getWeiBoHotList();

  await fs.writeFileSync(//,
    `${__dirname}/hotSearch.json`,
    JSON.stringify(hotList),
    "utf-8"
  );
  console.log("写入成功", Date.now());
  const file = `${__dirname}/hotSearch.json`
  const result = JSON.parse(fs.readFileSync(file))
  console.log('测试')
  response(res, result, 200, 0)
} catch (error) {
  const file = `${__dirname}/hotSearch.json`
  const result = '失败'
  console.error(error);
  response(res, result, 400)
}
}


function throwHotList(req, res, next){
  
  const file = `${__dirname}/hotSearch.json`
  const result = JSON.parse(fs.readFileSync(file))
  console.log('测试')
  response(res, result, 200, 0)
}



module.exports = {
  fun_
}