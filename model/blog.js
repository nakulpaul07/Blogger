const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    feature: {
        type: String,
        require: true,
    },
    active: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        public_id: {
            type: String,
            Required: true,
        },
        url: {
            type: String,
            Required: true,
        },

    },

}, { timestamps: true })

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel;