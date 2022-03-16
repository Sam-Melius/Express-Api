const { Router } = require('express');
const Monster = require('../models/Monster');

module.exports = Router()

  .post('/', async (req, res) => {
    const monster = await Monster.insert(req.body);
    res.send(monster);

  })

  .get('/', async (req, res) => {
    const monsters = await Monster.findAll();
    res.send(monsters);
  })

  .get('/:id', async (req, res) => {
    const monster = await Monster.findById(req.params.id);
    res.send(monster);
  })

  .delete('/:id', async (req, res) => {
    const monster = await Monster.deleteById(req.params.id);
    res.send(monster);
  })

  .patch('/:id', async (req, res) => {
    const monster = await Monster.updateById(req.params.id, req.body);
    res.send(monster);
  })
;
