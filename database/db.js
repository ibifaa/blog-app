// Connect to mongodb
const mongoose = require('mongoose');

async function connectDb(){
    try {
        const res = await mongoose.connect('mongodb://0.0.0.0:27017/blogDb')
        console.log("connected to db successfully")
   

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {connectDb};
