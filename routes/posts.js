const { query } = require('express')
const express = require('express')
const router = express.Router()

//load model
const Post = require('../models/posts')

//Hiển thị trang tạo bài viết mới
router.get('/add', (req,res) => {
    res.render('posts/add')
})

//Hiển thị trang danh sách toàn bộ các posts
router.get('/', async (req,res) => {
    const posts = await Post.find().lean().sort({date: -1})
    res.render('posts/index', {posts})
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

//Hiển thị trang edit posts
router.get('/edit/:id', async(req, res) => {
    // console.log()
    const post = await Post.findOne({_id:req.params.id}).lean()
    // console.log(post)
    // console.log(req.params)
    res.render('posts/edit', {post})
})
//Cập nhật data sau khi edit vào CSDL
router.put('/:id', async(req,res) => {
    const {title, text} = req.body
    await Post.findOneAndUpdate({ _id: req.params.id}, {title, text})
    res.redirect('/posts')
})

//Xóa bài viết
router.delete('/:id', async(req,res) => {
    await Post.findByIdAndRemove({_id: req.params.id})
    res.redirect('/posts')
})



module.exports = router