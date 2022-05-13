const JsonModel = require('../models/jsonModel');

const productsModel = new JsonModel('products');

const controller = {
    index: (req, res) => {
        let products = productsModel.all();
        res.render('products/index', { products });
    },
    show: (req, res) => {
        let product = productsModel.find(req.params.id);

        if (product) {
            res.render('products/detail', { product });
        } else {
            res.render('products/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El producto que buscas ya no existe, nunca existió y tal vez nunca exista.'
                }
            });
        }
    },
    create: (req, res) => {
        res.render('products/create');
    },
    store: (req, res) => {
        req.body.image = req.file ? req.file.filename : '';
        let productId = productsModel.save(req.body);

        res.redirect('/productos/' + productId);
    },
    edit: (req, res) => {
        let product = productsModel.find(req.params.id);

        if (product) {
            res.render('products/edit', { product });
        } else {
            res.render('products/404', { 
                message: {
                    class: 'error-message',
                    title: 'Inexistente',
                    desc: 'El producto que buscas ya no existe, nunca existió y tal vez nunca exista.'
                }
            });
        }
    },
    update: (req, res) => {
        req.body.id = req.params.id;
        /* Si nos lleva imagen guardamos esa, de lo contrario mantenemos la anterior */
        req.body.image = req.file ? req.file.filename : req.body.oldImage;
        productsModel.update(req.body);

        res.redirect('/productos/' + req.params.id);
    },
    destroy: (req, res) => {
        productsModel.destroy(req.params.id);
        res.redirect('/productos');
    },
}

module.exports = controller;