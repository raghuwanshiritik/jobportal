const express = require('express')
const FrontController = require('../Controllers/FrontController')
const AdminController = require('../Controllers/AdminController')
const auth =require('../middleware/auth')
const router = express.Router()


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
router.get('/admin/dashboard',FrontController.dashboard)


//AdminController
router.post("/adminregister",AdminController.register)
router.post("/verifylogin",AdminController.verifylogin)
router.get('/logout',auth,AdminController.logout)
router.get('/adminDashboard',auth, AdminController.DisplayData)
router.get('/admin/welcome',  AdminController.Welcome)
router.get('/admin/userdisplay', AdminController.UserDisplay)
router.get('/changePassword',auth, AdminController.ChangePassword)
router.post('/updatepassword/:id', AdminController.UpdatePassword)
module.exports=router


