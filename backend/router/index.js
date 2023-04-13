const r_user = require('./userRouter')
const r_product = require('./productRouter')

module.exports = {
    route: [
        r_user,
        r_product
    ]
}