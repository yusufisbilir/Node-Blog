const User = require('../models/users');

const login_get = (req,res)=>{
    res.render('login',{title:"Login Page"})
};

const login_post = (req,res)=>{}
const signup_get = (req,res)=>{
    res.render('signup',{title:"Register Page"})
}
const signup_post = (req,res)=>{
    const user = new User(req.body)
    user.save()
        .then((result)=>{
            res.redirect('/login')
        })
        .catch(err=> console.log(err))
}
const logout_get = (req,res)=>{}

module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_get
}