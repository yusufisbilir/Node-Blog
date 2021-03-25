const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const User = new mongoose.model('user',userSchema);

module.exports = User;