const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const app = express();
const port = 3000;

const dbUrl = 'mongodb+srv://yusufisbilir:1234@nodejs-blog.691wr.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>{
        app.listen(port);
    }).catch((err)=>{
        console.log(err);
    })

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/', (req, res) => {
    Blog.find().sort({createdAt:-1})
        .then(result=>{
            res.render('index',{title:"Main Page",blogs:result})
        }).catch(err=>{
            console.log(err);
        })
});

app.get('/blog/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render('blog',{blog:result,title:'example'})
        }).catch(err=>{
            app.use((req,res)=>res.status(404).render('404',{title:'Error Page'}));
        })
});

app.get('/admin',(req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then(result=>{
            res.render('admin',{title:"Admin",blogs:result})
        }).catch(err=>{
            console.log(err);
        })
});

app.get('/admin/add',(req,res)=>{
    res.render('add',{title:"New Writing"})
})

app.post('/admin/add',(req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result=>{
            res.redirect('/admin')
        })
        .catch(err=>{
            console.log(err);
        })
});

app.delete('/admin/delete/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({link:'/admin'})
        })
        .catch(err=>{
            console.log(err);
        })
})

app.get('/about', (req, res) => {
    res.render('about',{title:'About'})
});

app.get('/login', (req, res) => {
    res.render('login',{title:'Login'})
});

app.use((req,res)=>res.status(404).render('404',{title:'Error Page'}));