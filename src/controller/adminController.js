const Blog = require('../models/blogs');


const admin_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then(result=>{
            res.render('admin',{title:"Admin",blogs:result})
        }).catch(err=>{
            console.log(err);
        })
};

const admin_add = (req,res)=>{
    res.render('add',{title:"New Writing"})
};

const admin_add_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result=>{
            res.redirect('/admin')
        })
        .catch(err=>{
            console.log(err);
        })
};

const admin_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({link:'/admin'})
        })
        .catch(err=>{
            console.log(err);
        })
};

module.exports = {
    admin_index,
    admin_add,
    admin_add_post,
    admin_delete
};