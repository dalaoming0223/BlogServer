const {
  sql
} = require('./sequelize')
const User = require('./User')
const {
  Blog,
  BlogTag,
  BlogLike
} = require('./Blog')
const Comment = require('./Comment')
const Category = require('./Category')
const Tag = require('./Tag')

// 添加外键到目标模型
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
User.hasMany(BlogLike, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})
Blog.hasMany(BlogLike, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

Category.hasMany(Blog, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})
//
Tag.belongsToMany(Blog, {
  through: 'blog_tag'// 通过这个blog_tag表
})
Blog.belongsToMany(Tag, {
  through: 'blog_tag' // 通过blog_tag表
})

// 重建表需加入{ force: true }
sql.sync()

module.exports = {
  User,
  Blog,
  BlogTag,
  BlogLike,
  Category,
  Comment,
  Tag
}
