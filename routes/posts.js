const express = require('express')
const router = express.Router()

//load model
const Post = require('../models/posts')

//Hiển thị trang tạo bài viết mới
router.get('/add', (req,res) => {
    res.render('posts/add')
})

//Tạo posts mới
router.post('/', async(req, res) => {
    const {title, text} = req.body
    let errors = []
    if(!title){
        errors.push({msg: 'Title required'})
    }
    if(!text){
        errors.push({msg: 'Text required'})
    }
    if(errors.length > 0) res.render('posts/add', { title, text})
    else{
        const newPostData = {title, text}
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

// router.get('/', (req,res) => {
//     res.send('danh sách bài viết')
// })

module.exports = router