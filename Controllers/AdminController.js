const AdminModel =require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class AdminController{

   static register = async (req,res) => {
      try {
        const { name, email, password, confirmpassword } = req.body;
        const admin = await AdminModel.findOne({ email: email });
  
        if (admin) {
          req.flash("error", "Email already exists");
          res.redirect("/register");
        } else {
          if (name && email && password && confirmpassword) {
            if (password == confirmpassword) {

              const hashpassword = await bcrypt.hash(password,10)
              const register =  new AdminModel({
                name: name,
                email: email,
                password: hashpassword,
                confirmpassword:confirmpassword
              });
  
              await register.save();
              res.redirect("/login");
            } else {
              req.flash("error", "Password and confirm password does not match");
              res.redirect("/register");
            }
          } else {
            req.flash("error", "All fields are required");
            res.redirect("/register");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    static verifylogin = async (req,res) =>{
      try{
        // console.log(req.body)
        const {email,password} = req.body
        if(email && password){
          const admin =await AdminModel.findOne({email:email})

        if (admin != null){
          const  ismatched = await bcrypt.compare(password,admin.password)
          if(ismatched){
            if(admin.role="user"){
              const token =  jwt.sign({id:admin._id},'ritikraghuwanshi123')
              // console.log(token)
              res.cookie('token',token)
              res.redirect('/')
            }
             if(admin.role="admin"){
              const token =  jwt.sign({id:admin._id},'ritikraghuwanshi123')
              // console.log(token)
              res.cookie('token',token)
              res.redirect('/blog')
            }
          }else{
            req.flash('error','email or password is incorrect')
            res.redirect('/login')
          }
 
        }else{
          req.flash('error','you are not a register user')
          res.redirect('/login')
        }
       } else{
          req.flash('error','All fields are required.')
            res.redirect('/login')
        }
      }
      catch(error){
        console.log(error)
      }
    }


    static logout = async(req,res)=>{
      try{
        res.clearCookie('token')
        res.redirect('/login')
      }
    catch(error){
      console.log(error)
    }
  }

 
}

module.exports = AdminController