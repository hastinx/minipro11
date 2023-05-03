const router = require('express').Router()
const { c_transaction } = require('../controllers')



router.get('/transaction/product', c_transaction.getAllProduct)

module.exports = router