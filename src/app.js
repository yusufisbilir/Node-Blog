const { render } = require('ejs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))

app.set('view engine','ejs')

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

app.listen(port, () => console.log(` app listening on port ${port}`));