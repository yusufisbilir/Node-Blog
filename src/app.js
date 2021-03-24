const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const dbUrl = 'mongodb+srv://yusufisbilir:1234@cluster0.691wr.mongodb.net/nodeBlog?retryWrites=true&w=majority'
mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>{
        app.listen(port);
    }).catch((err)=>{
        console.log(err);
    })

app.use(express.static('public'));

app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('index',{title:'Main Page'})
});

app.get('/about', (req, res) => {
    res.render('about',{title:'About'})
});

app.get('/login', (req, res) => {
    res.render('login',{title:'Login'})
});

app.use((req,res)=>res.status(404).render('404',{title:'Error Page'}));