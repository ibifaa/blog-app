// Creating a model
const mongoose = require('mongoose');

// Creating a schema pattern for document to be collected
const blogSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    subject:{
        type: String,
        required:true,
    },
    message:{
        type: String,
        required:true,
    }

});

// To create the model we use the mongoose.model, that take two argument
//  collection name and the schema which is the structure of the 
// data we are expecting from the client side


const BlogModel = mongoose.model('blog', blogSchema);

module.exports = BlogModel;

