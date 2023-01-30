const mongoose = require('mongoose');


const BlogSchema = mongoose.Schema({
    'Title': { type: 'String', required: true },
    'Category': { type: 'String', required: true },
    'Author': { type: 'String', required: true },
    'Content': { type: 'String', required: true },
})


const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;