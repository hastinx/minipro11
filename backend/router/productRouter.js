const router = require('express').Router()
const { c_product } = require('../controllers')


router.post('/product/add', c_product.addProduct)
router.get('/product', c_product.getProduct)

module.exports = router