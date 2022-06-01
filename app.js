const moment = require("moment");
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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

//Khởi động Method-override middleware
app.use(methodOverride('_method'))


//khoi dong express middleware
app.use(express.json())

//ket noi csdl
connectDB()

// Một số routes cơ bản, có thể đưa vào file riêng trong thư mục routes
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

//sử dụng routes posts
app.use('/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT} http://localhost:5000/`))