
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class FrontController{

  static login = async(req,res) =>{
    try{
      res.render('login',{message:req.flash('error')})
    }
    catch(error){
      console.log(error)
    }
  }
 
  static register= async(req,res)=>{
  
    try{
      res.render('register',{message:req.flash('error')})

    }

    catch(error){
      console.log(error)
    }
  }
    
    

    static logout =async(req,res)=>{
        try{
            res.redirect('/login')
        }
        catch (error){
            console.log(error)
        }
    }

  
   static header =(req,res)=>{
    res.render('header')
}


static home =(req,res)=>{
    res.render('home')
}
static joblisting =(req,res)=>{
    res.render('joblisting')
   }

   static services =(req,res)=>{
    res.render('services')
}

static blog =(req,res)=>{
    res.render('blog')
}

static contact =(req,res)=>{
    res.render('contact')
}

    static about =(req,res)=>{
        res.render('about')
    }
    static footer =(req,res)=>{
        res.render('footer')
    }
}
module.exports = FrontController