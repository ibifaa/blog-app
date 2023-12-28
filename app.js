
// initionalization
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Connect to mongodb
async function connectDb(){
    try {
        const res = await mongoose.connect('mongodb://0.0.0.0:27017/blogDb')
        console.log("connected to db successfully")
    app.listen(port, ()=>{ console.log(`Server is running in port: ${port}`)})

    } catch (error) {
        console.log(error.message)
    }
}

connectDb();