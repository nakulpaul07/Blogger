const express = require('express')
const FrontController = require('../Controller/FrontController')
const BlogController = require('../Controller/blog')
const AdminController = require('../Controller/adminController')
const auth = require('../middleware/auth')
const route = express.Router()

// ejs route
route.get('/', FrontController.login)
route.get('/index', auth, FrontController.index)
route.get('/about', auth, FrontController.about)
route.get('/admin_blog_list', auth, FrontController.admin_blog_list)
route.get('/blog_form', auth, FrontController.blog_form)
route.get('/bloglist', auth, FrontController.bloglist)
route.get('/contact', auth, FrontController.contact)
route.get('/dashboard', auth, FrontController.dashboard)
route.get('/detail/:id', auth, FrontController.detail)
route.get('/register', FrontController.register)
route.get('/logout', auth, FrontController.logout)

// contact ddbs
route.post('/contactInsert', auth, BlogController.contactInsert)





// Admin Controller
route.post('/adminregister', AdminController.AdminRegister)
route.post('/adminlogin', AdminController.AdminLogin)





// blog_form DBS;
route.post('/blogInsert', auth, BlogController.blogInsert)
route.get('/blogEdit/:id', auth, BlogController.blogEdit)
route.get('/blogDelete/:id', auth, BlogController.blogDelete)
route.post('/blogUpdate/:id', auth, BlogController.blogUpdate)






module.exports = route