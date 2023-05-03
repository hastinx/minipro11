const r_user = require('./userRouter')
const r_product = require('./productRouter')
const r_transaction = require('./transactionRouter')
const r_category = require('./categoryRouter')

module.exports = {
    route: [
        r_user,
        r_product,
        r_transaction,
        r_category
    ]
}