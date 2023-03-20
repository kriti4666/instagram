const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    follower: [{type: Schema.Types.ObjectId, ref:"user"}],
    following: [{type: Schema.Types.ObjectId, ref:"user"}],
    


}, {timestamps: true})

const User = model("user", userSchema);

module.exports = User;