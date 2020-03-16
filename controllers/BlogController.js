/* eslint-disable camelcase */
const {
  Blog,
  User,
  Tag,
  BlogTag
} = require('../model/Model')

const {
  add_tag_intern
} = require('./TagController')

const {
  response
} = require('./Response')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function getAllBlog (req, res) {
  const ret_data = {}
  let currentPage = parseInt(req.query.page) || 1
  let filterTags = req.query.tag || []
  console.log(filterTags)
  let queryResult = null // 查询结果
  let pageCount = 0
  const sortBy = 'updated_at'
  if (!Array.isArray(filterTags)) {
    filterTags = [filterTags]
  }
  try {
    const countPerPage = 10
    if (currentPage <= 0) {
      currentPage = 1
    }
    if (filterTags.length === 0) {
      console.log(countPerPage, countPerPage * (currentPage - 1))
      queryResult = await Blog.findAndCountAll({ // sequelize分页查询
        limit: countPerPage, // 每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true, // 查询结果去重
        include: [
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: {
              attributes: []
            }
          },
          {
            /* 连接查询时，如果要连接查询的两个模型间事先没有定义连接关系，
            或者要使用定义之外的连接关系。
            这时，可以通过association来定义或重新定义模型关系。 */
            association: Blog.belongsTo(User,
              {
                foreignKey: 'user_id'
              })
            // attributes: ['avatar', 'username'] // sequelize的attributes选项（sequelize选取表中的特定列）
          }
        ],
        where: {
          state: 1
        }
      })
    } else {
      const result = await BlogTag.findAll({
        where: {
          tag_id: {
            [Op.in]: filterTags
          }
        },
        attributes: ['blog_id'],
        group: 'blog_id'
      })

      const blogList = result.map(i => i.dataValues.blog_id)

      queryResult = await Blog.findAndCountAll({
        distinct: true, // 查询结果去重
        include: [
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: {
              attributes: []
            }
          },
          {
            association: Blog.belongsTo(User,
              {
                foreignKey: 'user_id'
              })
            // attributes: ['avatar', 'username']
          }
        ],
        where: {
          id: {
            [Op.in]: blogList
          },
          state: 1
        },
        limit: countPerPage, // 每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ]
      })
    }
    pageCount = Math.ceil(queryResult.count / countPerPage)
    ret_data.data = queryResult.rows
    ret_data.total = queryResult.count
    ret_data.page = currentPage
    ret_data.pageCount = pageCount
    response(res, ret_data, 200, 0)
  } catch (error) {
    console.log(error.message)
    response(res, ret_data, 400)
  }
}

async function getBlogById (req, res) {
  const id = req.params.id
  const ret_data = {}
  try {
    const blog = await Blog.findByPk(id)
    if (blog === null) {
      response(res, ret_data, 404)
    } else {
      console.log(JSON.stringify(blog))
      ret_data.data = blog
      response(res, ret_data, 200, 0)
    }
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}

async function AddBlog (req, res) {
  const ret_data = {}
  const postData = req.body
  // console.log(JSON.stringify(postData))
  // console.log('能到这里不')
  console.log(postData)
  console.log(typeof postData.tags)

  // let tags = JSON.parse(postData.tags)
  let tags = postData.tags
  // console.log(typeof tags)
  if (!Array.isArray(tags)) {
    tags = [tags]
  }

  const title = postData.title
  const content = postData.content
  const desc = postData.desc
  const time = new Date()
  const created_at = time
  const updated_at = time
  const state = 1
  const user_id = postData.user_id

  try {
    const tag_id_list = []
    for (const tag of tags) {
      const tagQuery = await Tag.findOne({
        where: {
          name: tag
        }
      })
      if (tagQuery === null) {
        // 如果不存在
        const tagAdd = await add_tag_intern(tag)
        tag_id_list.push(tagAdd.dataValues.id)
        console.log('标签id表：', tag_id_list)
      } else {
        // 如果数据库中已经存在，
        tag_id_list.push(tagQuery.id)
        console.log('标签id表：', tag_id_list)
      }
    }
    const blog = await Blog.create({
      title, content, desc, created_at, updated_at, state, user_id
    })
    for (const tag_id of tag_id_list) {
      blog.setTags(tag_id)
    }
    ret_data.id = blog.id
    response(res, ret_data, 201)
  } catch (error) {
    console.log(error.message)
    response(res, ret_data, 400)
  }
}
module.exports = {
  getAllBlog,
  getBlogById,
  AddBlog
}
