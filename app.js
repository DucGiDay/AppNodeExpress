const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')

//nhập khẩu routes
const posts = require('./routes/posts') 

//khoi dong app
const app = express()

//khởi động handlebar middleware
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//khởi động bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//khoi dong express middleware
app.use(express.json())

//ket noi csdl
connectDB()

// Một số routes cơ bản, có thể đưa vào file riêng trong thư mục routes
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

//sử dụng routes posts
app.use('/posts', posts)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))