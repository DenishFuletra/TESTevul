const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

function ConnectDatabase() {

    let result = mongoose.connect("mongodb+srv://evul-blog-app:12345@cluster0.lbfdqcu.mongodb.net/evulBlog");
    return result;
}

module.exports = ConnectDatabase;
