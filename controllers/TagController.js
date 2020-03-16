/* eslint-disable camelcase */
const {
  Tag,
  User
} = require('../model/model')
const {
  response
} = require('./Response')

async function add_tag_intern (name) {
  const state = 1
  const time = new Date()
  const created_at = time
  const updated_at = time

  // eslint-disable-next-line no-return-await
  return await Tag.create({
    name, state, created_at, updated_at
  })
}

async function add_tag (req, res) {
  const ret_data = {}
  const post_data = req.body
  const name = post_data.name
  const state = post_data.state || 1
  const time = new Date()
  const created_at = time
  const updated_at = time

  try {
    const tag = await Tag.create({
      name, state, created_at, updated_at
    })
    console.log(JSON.stringify(tag))
    ret_data.id = tag.id
    response(res, ret_data, 201)
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}

async function delete_tag (req, res) {
  const ret_data = {}
  const id = req.params.id
  if (id) {
    try {
      const tag = await Tag.destroy(
        {
          where: {
            id: id
          }
        }
      )
      console.log(JSON.stringify(tag))
      if (tag > 0) {
        response(res, ret_data, 200, -1)
      } else {
        response(res, ret_data, 404)
      }
    } catch (err) {
      console.log(err.message)
      response(res, ret_data, 400)
    }
  } else {
    response(res, ret_data, 400)
  }
}

async function update_tag (req, res) {
  const ret_data = {}
  const id = req.params.id
  try {
    const tag = await Tag.findByPk(id)
    if (tag === null) {
      response(res, ret_data, 404)
      return
    }
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
    return
  }

  const put_data = req.body
  console.log(JSON.stringify(put_data))
  const name = put_data.name
  const state = put_data.state
  const time = new Date()
  const updated_at = time
  try {
    const tag = await Tag.update(
      { name, state, updated_at },
      {
        where: {
          id: id
        }
      })
    console.log(JSON.stringify(tag[0]))
    if (tag[0] > 0) {
      response(res, ret_data, 200, 1)
    } else {
      response(res, ret_data, 400)
    }
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}

async function get_tag_by_id (req, res) {
  const id = req.params.id
  const ret_data = {}
  try {
    const tag = await Tag.findByPk(id)
    if (tag === null) {
      response(res, ret_data, 404)
    } else {
      console.log(JSON.stringify(tag))
      ret_data.data = tag
      response(res, ret_data, 200, 0)
    }
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}

async function get_all_tag (req, res) {
  const ret_data = {}
  try {
    const queryResult = await Tag.findAndCountAll()

    ret_data.data = queryResult.rows
    ret_data.total = queryResult.count

    response(res, ret_data, 200, 0)
  } catch (err) {
    console.log(err.message)
    response(res, ret_data, 400)
  }
}
module.exports = {
  add_tag_intern,
  add_tag,
  delete_tag,
  get_all_tag,
  get_tag_by_id,
  update_tag
}
