const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    short:{
        type:String,
        require:true,
    },
    long:{
        type:String,
        require:true,
    },
    
},{timestamps:true} //data adding time
);

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;