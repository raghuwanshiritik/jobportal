const express = require('express')
const FrontController = require('../Controllers/FrontController')
const AdminController = require('../Controllers/AdminController')
const router = express.Router()
const auth =require('../middleware/auth')

//router path


//Front Controller
router.get("/joblisting",auth,FrontController.joblisting)
router.get("/header",auth,FrontController.header)
router.get("/services",auth,FrontController.services)
router.get("/",auth,FrontController.home)
router.get("/blog",auth,FrontController.blog)
router.get("/about",auth,FrontController.about)
router.get("/contact",auth,FrontController.contact)
router.get("/footer",auth,FrontController.footer)
router.get("/register",FrontController.register)
router.get('/login',FrontController.login)



//AdminController
router.post("/adminregister",AdminController.register)
router.post("/verifylogin",AdminController.verifylogin)
router.get('/logout',AdminController.logout)

module.exports=router


