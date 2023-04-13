const db = require('../config/db.js')
const promise = db.promise()
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const { username, email, phone, store_name, password } = req.body

        const [result] = await promise.query(`SELECT * FROM tb_mst_user WHERE username='${username} OR email='${email}'`)

        console.log(result)

        if (result.length > 0) {
            return res.json({
                status: 400,
                message: "account already exist"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        await promise.query(`INSERT INTO tb_mst_user (
            username, 
            email, 
            phone, 
            store_name, 
            password)
            VALUES
            (
                '${username}',
                '${email}',
                '${phone}',
                '${store_name}',
                '${hashPass}'
            )
            `)

        res.json({
            status: 200,
            message: 'Register sucessfully'
        })
    },

    login: async (req, res) => {
        const { username, password } = req.body

        const [result] = await promise.query(`SELECT * FROM tb_mst_user WHERE username='${username}'`)

        const isvalid = await bcrypt.compare(password, result[0].password)

        if (isvalid) {
            return res.json({
                status: 200,
                message: 'Login sucessfully'
            })
        }
        res.json({
            status: 400,
            message: 'wrong username or password'
        })
    }
}