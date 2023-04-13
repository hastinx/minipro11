const router = require('express').Router()
const { c_user } = require('../controllers')

router.post('/user/register', c_user.register)
router.post('/user/login', c_user.login)

module.exports = router