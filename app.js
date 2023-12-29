
// initionalization
const express = require('express');
const mongoose = require('mongoose');
const {connectDb} = require('./database/db');
const BlogModel = require('./models/BlogModel');

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
//  this serves the same purpose as body-parser
app.use(express.urlencoded({ extended: true })); 
// this is required to be able to parse a body of a request

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

app.get('/view-blog', (req, res)=>{
    try {
        res.render('view');
    } catch (error) {
        console.log(error);
    }
})

// CREATE MAKING A POST REQUEST
app.get('/write-blog', (req, res)=>{
    try {
        res.render('post')
    } catch (error) {
        console.log(error)
    }
});

 (async function(){
    await connectDb();
    app.listen(port, ()=>{ console.log(`Server is running in port: ${port}`)})
})()

