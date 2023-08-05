const jwt = require('jsonwebtoken')
const AdminModel =require('../models/admin')
const checkAdminAuth = async (req,res,next) =>{
    // console.log('hello middleware')
    const {token} = req.cookies
    // console.log(token)
    console.log(token)
    if(!token){
        console.log(token)
        req.flash('error','unauthorized admin')
        res.redirect('/login')
    }else{
        console.log(token)
        const data = jwt.verify(token,
        'ritikraghuwanshi123')
        console.log(data)
        const admin =await AdminModel.findOne({_id:data.id})
        // console.log(admin)
        req.admin = admin
        next()
    }

}

module.exports =checkAdminAuth