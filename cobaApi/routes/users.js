var express = require('express');
var router = express.Router();
var models = require('../models');
var { Response } = require('../helpers/utils')
const { Op } = require('sequelize');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const { name, phone } = req.query

    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit

    const total = await models.User.count()
    const pages = Math.ceil(total / limit)

    if (name && phone) {
      const { count, rows } = await models.User.findAndCountAll({
        where:
        {
          [Op.and]:
            [
              { name: { [Op.like]: '%' + name + '%' } },
              { phone: { [Op.like]: '%' + phone + '%' } }
            ]
        }, limit: limit, offset: offset
      })
      res.json(new Response({ users : rows, totalCount: count, page, pages: pages, offset }))
    }
    else if (name) {
      const  { count, rows } = await models.User.findAndCountAll({
        where:
          { name: { [Op.like]: '%' + name + '%' } }
        , limit: limit, offset: offset
      })
      res.json(new Response({ users : rows, totalCount: count, page, pages: pages, offset }))
    }
    else if (phone) {
      const  { count, rows } = await models.User.findAndCountAll({
        where:
          { phone: { [Op.like]: '%' + phone + '%' } }
        , limit: limit, offset: offset
      })
      res.json(new Response({ users : rows, totalCount: count, page, pages: pages, offset }))
    }
    else {
      const  { count, rows } = await models.User.findAndCountAll({
        order: [['id', 'DESC']]
        , limit: limit, offset: offset
      })
      res.json(new Response({ users : rows, totalCount: count, page, pages: pages, offset }))
    }
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const user = await models.User.create(req.body)
    res.json(new Response(user))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const user = await models.User.update(req.body,
      {
        where:
        {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
    res.json(new Response(user[1]))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where:
      {
        id: req.params.id
      }
    })
    res.json(new Response(user))
  } catch (err) {
    res.status(500).json(new Response(err, false))
  }
});

module.exports = router;