const {
  sql,
  Sequelize
} = require('./sequelize')

const Blog = sql.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },

  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  desc: {
    type: Sequelize.STRING(255),
    allowNull: true
  },

  // 文章发布状态 => 0 草稿，1 已发布
  state: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },

  // 文章转载状态 => 0 原创，1 转载，2 混合
  origin: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    defaultValue: 0
  },

  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },

  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true
})

const BlogTag = sql.define('blog_tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true
})

// 点赞模型
const BlogLike = sql.define('blog_like', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true
})

module.exports = {
  Blog,
  BlogTag,
  BlogLike
}
