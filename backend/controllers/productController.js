const db = require('../config/db.js')
const promise = db.promise()


module.exports = {
    addProduct: async (req, res) => {
        const { name, desc, price, qty, category_id, image, createdBy } = req.body
        console.log(desc)
        const [result] = await promise.query(`SELECT * FROM tb_mst_produk WHERE nama='${name}' AND createdBy=${createdBy}`)
        console.log(result)
        if (result.length > 0) {
            return res.json({
                status: 400,
                message: 'Product already exist in your store'
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
        let skip = 0;
        if (req.query.page > 1) skip = (req.query.page - 1) * 9

        let sort = 'ASC';
        if (req.query.sort !== undefined) sort = req.query.sort

        let order = 'nama';
        if (req.query.order !== undefined) order = req.query.order

        console.log()
        if (req.query.category !== "0") {
            console.log('get 1')
            query = await promise.query(`SELECT pr.nama,pr.deskripsi,pr.qty,pr.price, ct.category_name FROM tb_mst_produk pr 
            JOIN tb_mst_category ct ON pr.category_id = ct.id
            WHERE pr.createdBy=${req.query.id} 
            AND pr.category_id=${req.query.category} 
            ORDER BY pr.${order} ${sort} 
            LIMIT 9 
            OFFSET ${skip}`)
        } else if (req.query.product_name !== "") {
            console.log('get 2')
            query = await promise.query(`SELECT pr.nama,pr.deskripsi,pr.qty,pr.price, ct.category_name FROM tb_mst_produk pr 
            JOIN tb_mst_category ct ON pr.category_id = ct.id
            WHERE pr.createdBy=${req.query.id} 
            AND pr.nama LIKE'%${req.query.product_name}%' 
            ORDER BY pr.${order} ${sort} 
            LIMIT 9 
            OFFSET ${skip}`)
        } else {
            console.log('get 3')
            query = await promise.query(`SELECT pr.nama,pr.deskripsi,pr.qty,pr.price, ct.category_name FROM tb_mst_produk pr 
            JOIN tb_mst_category ct ON pr.category_id = ct.id
            WHERE pr.createdBy=${req.query.id} 
            ORDER BY pr.${order} ${sort} 
            LIMIT 9 
            OFFSET ${skip}`)
        }

        const [result] = query
        const [count] = await promise.query(`SELECT * FROM tb_mst_produk WHERE createdBy=${req.query.id} AND is_deleted=0`)
        console.log(result)
        res.json({
            status: 200,
            values: {
                result,
                count_data: count.length,
                page: req.query.page
            }
        })
    },
}