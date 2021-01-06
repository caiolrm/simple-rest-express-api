const express = require('express');
const router = express.Router();
const { ProductService } = require('../services');
const productService = new ProductService();

router.get('/', async (req, res) => {
    const data = await productService.getAll();
    return res.json(data);
});

router.get('/:id', async (req, res) => {
    const data = await productService.getById(req.params.id);
    if (data) return res.json(data);
    else return res.sendStatus(404);
});

router.delete('/:id', async (req, res) => {
    const data = await productService.deleteById(req.params.id);
    if (data) return res.sendStatus(200);
    else return res.sendStatus(404);
});

router.put('/:id', async (req, res) => {
    try {
        const result = await productService.updateById(req.params.id, req.body);
        if (result) return res.sendStatus(200);
        else return res.sendStatus(404);
    } catch (e) {
        if (e.name === 'VALIDATION_ERROR') {
            return res.status(422).send(e.message);
        }
        return res.send(500);
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await productService.create(req.body);
        if (data) return res.status(201).json(data);
        else return res.sendStatus(404);
    } catch (e) {
        if (e.name === 'VALIDATION_ERROR') {
            return res.status(422).send(e.message);
        }
        return res.status(500).send(e.message);
    }
});

module.exports = router;