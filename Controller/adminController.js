const AdminModel = require('../model/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AdminController {

    static AdminRegister = async (req, res) => {
        try {
            const { name, email, password, confirmpassword } = req.body

            const admin = await AdminModel.findOne({ email: email })

            if (admin) {
                req.flash('error', 'Email Already Exist')
                res.redirect('/register')
            }
            else {

                if (name && email && password && confirmpassword) {

                    if (password == confirmpassword) {

                        const hashpassword = await bcrypt.hash(password, 10)

                        const result = new AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                        })

                        await result.save()
                        res.redirect('/')


                    }
                    else {
                        req.flash('error', 'Password And Confirm Password are not same')
                        res.redirect('/register')
                    }
                } else {
                    req.flash('error', 'All Field Are Required')
                    res.redirect('/register')
                }
            }



        } catch (error) {
            console.log(error)
        }
    }

    static AdminLogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body

            if (email && password) {

                const admin = await AdminModel.findOne({ email: email })

                if (admin != null) {

                    const ismatched = await bcrypt.compare(password, admin.password)

                    if (ismatched) {
                        // generet jwt token
                        const token = jwt.sign({ id: admin._id }, 'paul123')
                        // console.log(token)
                        res.cookie('token', token)
                        res.redirect('/dashboard')
                    } else {
                        req.flash('error', 'Email Or Password Is Not Same ')
                        res.redirect('/')
                    }

                } else {
                    req.flash('error', 'You Are Not A Register User ')
                    res.redirect('/')

                }

            } else {
                req.flash('error', 'All Field Are Required')
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AdminController;