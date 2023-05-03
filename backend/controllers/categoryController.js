const db = require('../config/db.js')
const promise = db.promise()

module.exports = {
    getAllCategory: async (req, res) => {
        const [result] = await promise.query(`SELECT * FROM tb_mst_category`)

        // console.log(result)

        res.status(200).json({
            values: result
        })
    },

    postCategory: async (req, res) => {
        const { category_name } = req.body
        const [result] = await promise.query(`SELECT * FROM tb_mst_Category WHERE category_name='${category_name}'`)
        console.log(result)
        if (result.length > 0) {
            return res.status(400).json({ status: 400, message: "Category already exist" })
        }
        if (category_name === '') {
            return res.status(400).json({ status: 400, message: "Category couldn't be empty" })
        }

        await promise.query(`INSERT INTO tb_mst_category (category_name) VALUES ('${category_name}')`)

        res.json({
            status: 200,
            message: "Insert Category Successfully"
        })
    }
}