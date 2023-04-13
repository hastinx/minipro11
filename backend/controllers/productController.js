const db = require('../config/db.js')
const promise = db.promise()


module.exports = {
    addProduct: async (req, res) => {
        const { name, desc, price, qty, category_id, image, createdBy } = req.body

        const [result] = await promise.query(`SELECT * FROM tb_mst_produk WHERE nama='${name}' AND createdBy=${createdBy}`)
        console.log(result)
        if (result.length > 0) {
            return res.json({
                status: 400,
                message: 'Product already exist in this store'
            })
        }

        await promise.query(`INSERT INTO tb_mst_produk 
        (nama,
            deskripsi,
            price,
            qty,
            category_id,
            is_deleted,
            image,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy) VALUES 
            ('${name}',
            '${desc}',
            ${price},
            ${qty},
            ${category_id},
            0,
            '${image}',
            now(),
            now(),
            ${createdBy},
            ${createdBy})`)

        res.json({
            status: 200,
            message: 'Product added successfully'
        })
    },

    getProduct: async (req, res) => {

        let query;
        if (req.query.name === undefined || req.query.category === undefined) {
            //pagination
            query = await promise.query(`SELECT * FROM tb_mst_produk LIMIT ${req.query.length} OFFSET ${req.query.skip}`)
        } else {
            //search by name
            query = await promise.query(`SELECT * FROM tb_mst_produk WHERE nama LIKE '%${req.query.name}%' OR category_id=${req.query.category} LIMIT ${req.query.length} OFFSET ${req.query.skip}`)
        }

        const [result] = query
        console.log(result)
        res.json({
            status: 200,
            values: result
        })
    },
}