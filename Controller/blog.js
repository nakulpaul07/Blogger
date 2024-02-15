const BlogModel = require('../model/blog')
const cloudinary = require('cloudinary')
const ContactModel = require('../model/contact')

cloudinary.config({
    cloud_name: 'dqqgdxtgx',
    api_key: '661387327716212',
    api_secret: 'aOQnvPghucWnXASKpR6AZu_i93Y'
});

class BlogController {

    static blogInsert = async (req, res) => {
        try {

            // console.log(req.files.image)
            const file = req.files.image;
            // image upload
            const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "BlogImage"
            })
            // console.log(file)

            const { title, feature, active, description } = req.body;

            const result = new BlogModel({
                title: title,
                feature: feature,
                active: active,
                description: description,
                image: {
                    public_id: uploadImage.public_id,
                    url: uploadImage.secure_url,
                },

            });
            await result.save()
            res.redirect("/admin_blog_list")

        } catch (error) {
            console.log(error)

        }
    }

    static blogEdit = async (req, res) => {
        try {
            // const { name, email } = req.data
            const data = await BlogModel.findById(req.params.id)
            res.render("blogcurd/edit", { d: data })

        } catch (error) {
            console.log(error)
        }
    }

    static blogUpdate = async (req, res) => {
        try {

            // console.log(req.body)

            const { title, feature, active, description } = req.body;

            await BlogModel.findByIdAndUpdate(req.params.id, {

                title: title,
                feature: feature,
                active: active,
                description: description,

            });
            res.redirect("/admin_blog_list")

        } catch (error) {
            console.log(error)

        }
    }

    static blogDelete = async (req, res) => {
        try {

            await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect("/admin_blog_list")

        } catch (error) {
            console.log(error)
        }
    }

    static contactInsert = async (req, res) => {
        try {
            // console.log(req.body)

            const { name, email, phone, message } = req.body;

            const result = new ContactModel({
                name: name,
                email: email,
                phone: phone,
                message: message,

            });
            await result.save()
            res.redirect("/contact")



        } catch (error) {
            console.log(error)
        }
    }




}

module.exports = BlogController;