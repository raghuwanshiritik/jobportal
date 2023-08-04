const mongoose = require('mongoose')



const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:'user'
    },
    role:{
        type:String,
        default:'user'
    },
    confirmpassword:{
        type:String,
        required:true
    }
},{timestamps:true})

    const AdminModel = mongoose.model('admin',AdminSchema)

    module.exports =AdminModel