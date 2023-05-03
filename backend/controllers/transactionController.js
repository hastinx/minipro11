const db = require('../config/db.js')
const promise = db.promise()

module.exports = {
    getAllProduct: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM tb_mst_produk WHERE is_deleted = 0`)

        res.status(200).json({
            values: result
        })
    }
}