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


    static verifylogin = async (req, res)=>{
      try{
          //console.log(req.body)
          const {email, password} = req.body
          if(email && password){
              const admin = await AdminModel.findOne({email:email})

              if(admin != null){
                  const ismatched = await bcrypt.compare(password, admin.password)
                  if(ismatched){
                      if(admin.role=="user"){
                          const token = jwt.sign({ id: admin._id }, 'ritikraghuwanshi123')
                          res.cookie('token',token)
                          //console.log(token) 
                          res.redirect('/')
                      }
                      
                      if(admin.role=="admin"){
                        const token = jwt.sign({ id: admin._id }, 'ritikraghuwanshi123')
                        res.cookie('token',token)
                        //console.log(token) 
                        res.redirect('/admin/dashboard')
                    }

                    if(admin.role=="compney"){
                      const token = jwt.sign({ id: admin._id }, 'ritikraghuwanshi123')
                      res.cookie('token',token)
                      //console.log(token) 
                      res.redirect('/joblisting')
                  }
                    
                     
                     

                  }else{
                      req.flash('error','Email or password is not matched')
                      res.redirect('/')
                  }

              }else{
                  req.flash('error','you are not registerd user')
                  res.redirect('/')
              }

          }else{
              req.flash('error','All fields are required')
              res.redirect('/')
          }

      }catch(error){
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

 
  static DisplayData = async (req, res)=>{
    try{
        const {name, _id, email } =  req.user
        res.render('admin/dashboard',{name:name,id:_id})
    }catch(error){
        console.log(error)
    }
}
static Welcome = async (req,res)=>{
    try{
        res.render('admin/welcomepage')
    }catch(error){
        console.log(error)
    }
}



static UserDisplay = async (req, res)=>{
    try{
        const userdata= await AdminModel.find()
        res.render('admin/userDisplay',{data:userdata})

    }catch(error){
        console.log(error)
    }
}
static ChangePassword = async (req, res)=>{
  try{
      const {userName, _id, email } = req.user
      res.render('admin/changePassword',{id:_id,name:userName,message: req.flash('error'),message1: req.flash('success')})

  }catch(error){
      console.log(error)
  }
}
static UpdatePassword = async (req, res)=>{
  try{
     // console.log(req.body)
     const {oldpassword, newpassword, confirmpassword} = req.body
     if(oldpassword && newpassword && confirmpassword){
      if(newpassword == confirmpassword){
          const user = await AdminModel.findById(req.params.id).select("+password")
          //console.log(user)
          const isMatch = await bcrypt.compare(oldpassword, user.password)
          if(isMatch){
              const salt = await bcrypt.genSalt(10)
              const newHashPassword = await bcrypt.hash(newpassword,salt)
              await AdminModel.findByIdAndUpdate(req.params.id,{
                  $set:{password:newHashPassword} 
              });
              req.flash('success','Password Updated successfully')
                  res.redirect('/changePassword')
             
          }else{
              req.flash('error','old password is incorrect')
              res.redirect('/changePassword')
          }

      }else{
          req.flash('error','New password and old password does not matched')
          res.redirect('/changePassword')  
      }

     }else{
      req.flash('error','All field are required')
      res.redirect('/changePassword')
     }
  }catch(error){
    console.log(error)  
  }
}



}

module.exports = AdminController