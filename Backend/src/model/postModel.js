const { appendFile } = require("fs");
const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    name: {
        type: String
    }
})

const PostModel = model("post", postSchema)
module.exports = PostModel