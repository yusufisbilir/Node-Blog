const Blog = require('../models/blogs');

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then(result=>{
            res.render('index',{title:"Main Page",blogs:result})
        }).catch(err=>{
            console.log(err);
        });
};

const blog_content = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render('blog',{blog:result,title:'example'})
        }).catch(err=>{
            res.status(404).render('404',{title:'Error Page'})
        });
};

module.exports = {
    blog_index,
    blog_content
}