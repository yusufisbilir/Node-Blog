const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');

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
    res.redirect('/blog')
});



app.use('/admin',adminRoutes);
app.use('/blog',blogRoutes);

app.get('/about', (req, res) => {
    res.render('about',{title:'About'})
});

app.get('/login', (req, res) => {
    res.render('login',{title:'Login'})
});

app.use((req,res)=>res.status(404).render('404',{title:'Error Page'}));