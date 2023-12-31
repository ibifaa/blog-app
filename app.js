
// initionalization
const express = require('express');
const mongoose = require('mongoose');
const {connectDb} = require('./database/db');
const BlogModel = require('./models/BlogModel');
const methodOverride = require('method-override');

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
//  this serves the same purpose as body-parser
app.use(express.urlencoded({ extended: true })); 
// this is required to be able to parse a body of a request
app.use(methodOverride("_method"));
// DESIGN FILE
app.set('view engine', 'ejs');
app.use(express.static("public"));



app.get('/', (req, res)=>{
    try {
        res.status(200).render('index');
    } catch (error) {
        console.log(error)
    }
})

app.get('/view-blog', async (req, res)=>{
    try {
        const blogs = await BlogModel.find();
        // console.log(blogs)
        res.render('viewBlog', {blogs});
    } catch (error) {
        console.log(error);
    }
})

app.get('/write-blog', (req, res)=>{
    try {
        res.render('postBlog');
    } catch (error) {
        console.log(error);
    }
})

app.get('/view-single-blog/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        // console.log(id);
        const blog = await BlogModel.findById(id);
        // console.log(blog)
        res.status(200).render('singleView', {blog});
    } 
    catch (error) {
        console.log(error.message)
    }
})

app.get('/update-blog/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        // console.log(id);
        const blog = await BlogModel.findById(id);
        // console.log(blog)
        res.status(200).render('update', {blog});
    } 
    catch (error) {
        console.log(error.message)
    }
})
// Crude
// updating a database using put request
app.put('/update-blog/:id', async(req, res)=>{
    try {
        const {name, email, subject, message} = req.body;
        const {id} = req.params
        const updatedBlogDetail = await BlogModel.findByIdAndUpdate(id, {
            name,
            email,
            subject,
            message
        });

       
        res.status(200).redirect('/view-blog');
  
    } 
    
    catch (error) {
        console.log(error)
    }
});

// DELETE A BLOG
app.delete('/delete-blog/:id', async (req, res) =>{
      try{
          const {id}= req.params;
          console.log(id);
          const deleted = await BlogModel.findByIdAndDelete(id);
          res.status(200).json({
            success: true,
            message: {redirect: '/view-blog'}
      });
      }
   catch (error) {
    console.log(error.message)
  }
})


// CREATE MAKING A POST REQUEST
app.post('/write-blog', async(req, res)=>{
    try {
        const {name, email, subject, message} = req.body;

        const newBlogDetail = new BlogModel({
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        const savedBlog = await newBlogDetail.save();
       
        console.log(savedBlog);
        res.status(201).redirect('/view-blog');
    //    res.status(201).json({
    //     success: true,
    //     savedBlog
    //    })
    } 
    
    catch (error) {
        console.log(error)
    }
});

 (async function(){
    await connectDb();
    app.listen(port, ()=>{ console.log(`Server is running in port: ${port}`)})
})()

