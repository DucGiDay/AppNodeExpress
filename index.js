const express = require('express')
const connectDB = require('./config/db')

//khoi dong app
const app = express()

//khoi dong express middleware
app.use(express.json())

//ket noi csdl
connectDB()

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))