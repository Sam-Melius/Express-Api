const { Router } = require('express');
const Monster = require('../models/Monster');

module.exports = Router()

  .post('/', async (req, res) => {
    const monster = await Monster.insert(req.body);
    res.send(monster);
  });
