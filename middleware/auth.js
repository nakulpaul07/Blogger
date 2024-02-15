const jwt = require('jsonwebtoken')
const AdminModel = require('../model/admin')

const checkAdminAuth = async (req, res, next) => {

    const { token } = req.cookies
    // console.log('hel')

    if (!token) {
        req.flash('error', 'Unauthorized Login')
        res.redirect('/')

    } else {
        const data = jwt.verify(token, 'paul123')
        // console.log(data)
        const admin = await AdminModel.findOne({ _id: data.id })
        // console.log(admin)
        req.admin = admin
        next()

    }
}

module.exports = checkAdminAuth;