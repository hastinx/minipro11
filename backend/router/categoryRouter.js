const router = require('express').Router()
const { c_category } = require('../controllers')

router.get('/master/category/list', c_category.getAllCategory)
router.post('/master/category/insert', c_category.postCategory)

module.exports = router