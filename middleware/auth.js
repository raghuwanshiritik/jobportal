const jwt = require('jsonwebtoken')
const UserModel = require('../models/admin')

const Admin_auth = async  (req,res,next)=>{
    try{
        //console.log('hello user')
    const {token} = req.cookies
    //console.log(token)
    const verify_token = jwt.verify(token,'ritikraghuwanshi123')
    //console.log(verify_token)
    const admin_data = await UserModel.findOne({_id: verify_token.id})
    //console.log(admin_data)
    req.user = admin_data
    next()

    }catch(error){
        req.flash('error')
       res.redirect('/login')
    }
    
}
module.exports = Admin_auth