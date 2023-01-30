const Blog = require('../database/BlogSchema')

async function AddBlogData(req, res) {
    try {
        let data = req.body;
        let { Title, Category, Author, Content } = data
        await Blog.create({ Title: Title, Category: Category, Author: Author, Content: Content });
        res.send("Deny");

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
async function GetBlogData(req, res) {
    try {
        let category = req.query.category;
        let author = req.query.author;
        console.log(category, author);
        try {
            if (category || author) {
                let data = await Blog.find({
                    $or: [
                        { Category: category },
                        { Author: author }
                    ]
                });
                console.log(data);
                return res.send(data);
            }
        }
        catch (err) {
            console.log(err.message)
            res.status(500).send({
                message: err.message
            })
        }
        let data = await Blog.find();
        // console.log(data);
        res.send(data);

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
async function GetBlogDataById(req, res) {
    try {
        let id = req.params.id;
        let data = await Blog.findById(id);
        res.send(data);

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
async function DeleteBlogData(req, res) {
    try {
        let id = req.params.id;
        //console.log(id);
        let data = await Blog.findByIdAndDelete(id);
        res.send(data);
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
async function UpdateBlogData(req, res) {
    try {
        let id = req.params.id;
        let UpdatedData = req.body;
        console.log(UpdatedData)
        console.log(id);
        let data = await Blog.findById(id);
        if (!data) {
            return res.status(500).send({
                message: 'Blog not found',
            })
        }
        await Blog.findByIdAndUpdate(id, { $set: UpdatedData })
        let newData = await Blog.findById(id);
        res.send(data);
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    AddBlogData,
    GetBlogData,
    DeleteBlogData,
    GetBlogDataById,
    UpdateBlogData
}