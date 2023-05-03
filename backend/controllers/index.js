const c_user = require('./userController')
const c_product = require('./productController')
const c_category = require('./categoryController')
const c_transaction = require('./transactionController')

module.exports = {
    c_user,
    c_product,
    c_transaction,
    c_category
}