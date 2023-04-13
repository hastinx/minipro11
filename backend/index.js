const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./config/db.js')
const router = require('./router')

const app = express()
app.use(cors())
app.use(express.json())

db.connect((err) => {
    if (!err) {
        console.log('Database Connected')
    }
    console.log(err)
})

for (route of router.route) {
    app.use('/api', route)
}




app.listen(process.env.PORT, () => console.log(`API running on PORT ${process.env.PORT}`))
