const BlogModel = require('../model/blog')

class FrontController {

    static login = async (req, res) => {
        try {
            res.render("login", { message: req.flash('error') })

        } catch (error) {
            console.log(error)
        }
    }

    static index = async (req, res) => {
        try {
            const data = await BlogModel.find().sort({ _id: -1 }).limit(6)
            // console.log(data)
            res.render("index", { d: data })

        } catch (error) {
            console.log(error)
        }
    }

    static about = async (req, res) => {
        try {
            res.render("about")

        } catch (error) {
            console.log(error)
        }
    }


    // Display Data Of Blog (Title And Description)
    static admin_blog_list = async (req, res) => {
        try {
            const data = await BlogModel.find()
            // console.log(data)
            res.render("admin_blog_list", { d: data, })

        } catch (error) {
            console.log(error)
        }
    }

    static blog_form = async (req, res) => {
        try {
            res.render("blog_form")


        } catch (error) {
            console.log(error)
        }
    }

    static bloglist = async (req, res) => {
        try {
            const data = await BlogModel.find().sort({ _id: -1 })
            // console.log(data)
            res.render("bloglist", { d: data })

        } catch (error) {
            console.log(error)
        }
    }

    static contact = async (req, res) => {
        try {
            res.render("contact")

        } catch (error) {
            console.log(error)
        }
    }

    static dashboard = async (req, res) => {
        try {
            const { name, email } = req.admin
            res.render("dashboard", { n: name, e: email })

        } catch (error) {
            console.log(error)
        }
    }

    static detail = async (req, res) => {
        try {
            const data = await BlogModel.findById(req.params.id)
            const recentblogs = await BlogModel.find().limit(6)
            // console.log(data)
            res.render("detail", { d: data, r: recentblogs, })
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            res.render("register", { message: req.flash('error') })

        } catch (error) {
            console.log(error)
        }
    }

    static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res.redirect('/')



        } catch (error) {
            console.log(error)
        }
    }




}


module.exports = FrontController;