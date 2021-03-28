const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const {requireAuth, checkUser} = require('./middlewares/authMiddleware');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;


mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    .then((result)=>{
        app.listen(port);
    }).catch((err)=>{
        console.log(err);
    })

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('*',checkUser)
app.get('/', (req, res) => {
    res.redirect('/blog');
});

app.use('/',authRoutes);
app.use('/blog',blogRoutes);
app.use('/admin',requireAuth,adminRoutes);

app.get('/about', (req, res) => {
    res.render('about',{title:'About'})
});



app.use((req,res)=>res.status(404).render('404',{title:'Error Page'}));